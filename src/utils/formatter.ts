import moment from 'moment';

const DisplayDatetime = (time: string) => moment(time).format('YYYY-MM-DD HH:mm');

const TimeNowString = (addMinutes:number) => {
  const dt = moment(new Date()).add(addMinutes, 'minutes').toISOString();
  return `${moment(dt).format('YYYY-MM-DDTHH:mm')}`;
};

const DisplayPrice = (price: number) => {
  const str = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price || 0);
  return str.substring(0, str.length - 3);
};

const FormatTitle = (title:any) => {
  if (!title) return title;
  const wordArr = title.split(' ');

  return wordArr.map((word:any) => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
};

const getDiscountDisplay = (amount:number, type:string) => {
  if (type === 'percentage') {
    return `${amount}%`;
  }
  if (type === 'nominal') {
    return `Rp ${amount}`;
  }
  return 'Rp 0';
};

export default {
  DisplayDatetime,
  DisplayPrice,
  FormatTitle,
  getDiscountDisplay,
  TimeNowString,
};
