import { getIconDate } from '@/libs/utils';

export default [
  {
    iconText: getIconDate("day"), //iconText是年、日、星期几数字
    tabText: "当天",
    path: "/",  //patn是路由路径
  },
  {
    iconText: getIconDate("month"),
    tabText: "近期",
    path: "/month",
  },
  {
    iconText: getIconDate("year"),
    tabText: "当年",
    path: "/year",
  },
];