import {Colors} from './Colors'
import dayjs from "dayjs";

export class Logger {
    static info(...args: any[]): void {
        console.log(`${dayjs().format("DD-MM-YYYY hh:mm:ss")} [${Colors.FG_CYAN}INFO${Colors.RESET}]`, ...args)
    }

    static error(...args: any[]): void {
        console.log(`${dayjs().format("DD-MM-YYYY hh:mm:ss")} [${Colors.FG_RED}ERROR${Colors.RESET}]`, ...args)
    }

    static warn(...args: any[]): void {
        console.log(`${dayjs().format("DD-MM-YYYY hh:mm:ss")} [${Colors.FG_CRIMSON}WARN${Colors.RESET}]`, ...args)
    }

    static success(...args: any[]): void {
        console.log(`${dayjs().format("DD-MM-YYYY hh:mm:ss")} [${Colors.FG_GREEN}SUCCESS${Colors.RESET}]`, ...args)
    }

    static test(...args: any[]): void{
        console.log(`${dayjs().format("DD-MM-YYYY hh:mm:ss")} [${Colors.FG_MAGENTA}TEST${Colors.RESET}]`, args)
    }
}