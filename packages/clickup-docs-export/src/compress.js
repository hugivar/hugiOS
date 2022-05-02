import { execSync } from 'child_process';

const months = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
};

const formatDate = (date, format) => {
    const map = {
        mm: months[date.getMonth()],
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }

    return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
}


const compress = () => {
    const today = new Date();
    const formattedDate = formatDate(today, 'mm-yy');

    execSync(`cd ./exports && zip -r ./${formattedDate}.zip *`);
};

compress();