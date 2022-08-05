// import { Logger } from "@nestjs/common";
// import {FileLogger} from "typeorm";
import { createWriteStream, access, mkdir, readdir, stat } from 'node:fs';

import {Injectable} from "@nestjs/common";
import * as os from "os";

const BYTES_IN_KILOBYTE = 1024;

const LOG_TYPE = 'log';
const ERROR_TYPE = 'error';
const INFO_TYPE = 'info';

const LOG_FILE_TYPES = [
    'logs',
    'errors',
];

@Injectable()
export class LoggingService {
    private logInfo: {
        [key: string]: {
            fileStream;
            lastFile: string;
        }
    } = {};

    private readonly appLogsPath: string;
    private readonly maxFileSize: number;

    constructor() {
        this.appLogsPath = `${process.cwd()}/logs`;
        this.maxFileSize = +process.env.MAX_FILE_SIZE_KB * BYTES_IN_KILOBYTE;

        access(this.appLogsPath, (err) => {
            if (err) {
                mkdir(this.appLogsPath, (err) => {
                    if (err) {
                        console.error('Can\'t create logs directory. Please check access and permissions');
                    }
                })
            }

            readdir(this.appLogsPath, (err, files) => {
                if (err) {
                    console.error('Can\'t read logs dir files');
                }

                LOG_FILE_TYPES.forEach((type) => {
                    this.logInfo[type] = {
                        lastFile: this.findLastFileName(files, type),
                        fileStream: null
                    };

                    if (this.logInfo[type].lastFile !== undefined) {
                        this.checkLogsFileSize(type);
                    } else {
                        this.logInfo[type].fileStream = createWriteStream(`${this.appLogsPath}/${type}.0.txt`);
                        this.logInfo[type].lastFile = `${type}.0.txt`;
                    }
                });
            });
        })
    }

    info(message: string) {
        this.logInfo['logs'].fileStream.write(this.getFormattedMessage(INFO_TYPE, message));

        this.checkLogsFileSize('logs');
    }

    log(message: string) {
        this.logInfo['logs'].fileStream.write(this.getFormattedMessage(LOG_TYPE, message));

        this.checkLogsFileSize('logs');
    }

    error(message: string) {

    }

    private writeToFile() {

    }

    private checkFileSize() {

    }

    private findLastFileName(files: string[], type: string): string | undefined {
        const fileNames = files.filter(filename => filename.search(type) !== -1).sort();

        return fileNames.pop();
    }
    private getFormattedMessage(type: string, message: string): string {
        return `${type.toUpperCase()}: ${new Date()} : ${message}${os.EOL}`;
    }

    private checkLogsFileSize(type: string) {
        stat(`${this.appLogsPath}/${this.logInfo[type].lastFile}`, (err, stats) => {
            if (err) {
                console.error(`Can\'t get ${type} file stats`);
            }

            const size = stats.size;

            const number = +this.logInfo[type].lastFile.split('.')[1];

            if (size > this.maxFileSize) {
                if (this.logInfo[type].fileStream) {
                    this.logInfo[type].fileStream.close()
                }

                this.logInfo[type].fileStream = createWriteStream(`${this.appLogsPath}/${type}.${number + 1}.txt`);
                this.logInfo[type].lastFile = `${type}.${number + 1}.txt`;
                this.info(`New ${type} file was created`);
            } else {
                if (!this.logInfo[type].fileStream) {
                    this.logInfo[type].fileStream = createWriteStream(`${this.appLogsPath}/${type}.${number}.txt`);
                }
            }
        });
    }

    private checkErrorsFileSize() {

    }
}
