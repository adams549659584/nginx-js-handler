export const formatDate = (date: Date, fmt: string) => {
  const o: { [key: string]: number } = {
    'y+': date.getFullYear(), // 年份
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
    'H+': date.getHours(), // 24小时制
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'f+': date.getMilliseconds(), // 毫秒
  };
  for (const k in o) {
    const matchResult = fmt.match(new RegExp(`${k}`));
    if (matchResult) {
      const matchStr = matchResult.toString();
      fmt = fmt.replace(matchStr, o[k].toString().padStart(matchStr.length, '0'));
    }
  }
  return fmt;
};
