package main

//by kevin at 2014-04-15 01：30
//写我喜欢玩的猜数字游戏，初学ｇｏ之第一个程序

import (
	"fmt"
	"math/rand"
	"time"
	/*"os"*/)

func RndNum() []int {
	//使用string, 但是却因为其不可被修改，只好使用[]
	num_set := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	sz := len(num_set)
	/*fmt.Println("sz:",sz)*/
	for i, _ := range num_set {
		r := rand.Intn(sz)
		/*fmt.Println("i:",i," v:",v," r:",r) */
		num_set[i], num_set[r] = num_set[r], num_set[i]
	}

	/*fmt.Println("num_set:", num_set) */
	return num_set[0:4]
}

func checknum(n int, target []int) (right_, miss_ int) {
	//将数字拆分成4个int[]
	num := []int{n / 1000, (n % 1000) / 100, (n % 100) / 10, (n % 10)}
	/*fmt.Println("num:", num) */
	/*fmt.Println("target:", target) */
	right := 0 //数字对且位置对
	miss := 0  //数字对但是位置不对
	for i, m := range num {
		for j, t := range target {
			if m == t {
				if i == j {
					right++
				} else {
					miss++
				}
			}
		}
	}

	return right, miss
}

func main() {
	//产生符合规则的数字
	rand.Seed(time.Now().UnixNano())
	num := RndNum()
	/*fmt.Println("num:", num) */

	//开始准备猜数字
	var right, miss int
	var guess_count int = 1

	for right != 4 {

		fmt.Printf("%d Please input a number(0000-9999):", guess_count)
		var s int
		fmt.Scanf("%d\n", &s)
		//fmt.Println("you input is:", s)
		right, miss = checknum(s, num)
		/*fmt.Println("right:",right," miss:", miss)*/
		fmt.Println("\t", s, "\t->\t", right, "A", miss, "B")
		guess_count++
	}

	fmt.Println("Yes!!Number is ", num)

}
