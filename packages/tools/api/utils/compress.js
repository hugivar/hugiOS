import { execSync } from 'child_process';

const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
};

const formatDate = (date, format) => {
    const map = {
        mm: months[date.getMonth()],
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    };

    return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
}


const compress = () => {
    const today = new Date();
    const formattedDate = formatDate(today, 'mm-yy');

    execSync(`cd ./data && zip -r ./${formattedDate}.zip *`);
};

compress();