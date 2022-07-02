/** 数字工具 */
export class NumberUtil {

  /**
   * @description 判断当前参数是否为素数（质数）
   * @param num 参数（整型）
   * @returns true是素数 false非素数
   */
  static isPrime(num: number): boolean {
    if (num === 1) {
      return false;
    } else if (num === 2 || num === 3 || num === 5) {
      return true;
    }
    // ceil上舍入
    for (let i = 2; i <= Math.ceil(Math.sqrt(num)); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * @description 请求两个数的最大公约数 CD (Common divisor)
   * @description 指两个或多个整数共有约数中最大的一个
   * @param num1 参数1
   * @param num2 参数2
   * @returns 最大公约数
   */
  static getMaxCD(num1: number, num2: number): number {
    [num1, num2] = [Math.max(num1, num2), Math.min(num1, num2)];
    if (num1 % num2 === 0) {
      return num2;
    }
    return this.getMaxCD(num2, num1 % num2);
  }

  /**
   * @description 请求两个数的最小公倍数 CM (Common multiple)
   * @description 指两个或多个整数共有倍数中最小的一个
   * @param num1 参数1
   * @param num2 参数2
   * @returns 最小公倍数
   */
  static getMinCM(num1: number, num2: number): number {
    // 两数之积 = 最大公约数 * 最小公倍数
    return num1 * num2 / this.getMaxCD(num1, num2);
  }

  /**
   * @description 获取参数的质因子列表
   * @param num 参数
   * @returns 质因子列表
   */
  static getPrimeList(num: number): number[] {
    const result: number[] = [];
    // 代码时间复杂度高
    // function getFunc(value: number) {
    //   if (value === 1) {
    //     return "";
    //   }
    //   for (let i = 2; i <= value; i++) {
    //     if (value % i === 0) {
    //       result.push(i);
    //       getFunc(value / i);
    //       return;
    //     }
    //   }
    // }
    // getFunc(num);
    for (let i = 2; i <= num; i++) {
      if (i > Math.sqrt(num) + 1) {
        i = num;
      }
      while (num % i === 0) {
        result.push(i);
        num = num / i;
      }
    }
    return [];
  }


}