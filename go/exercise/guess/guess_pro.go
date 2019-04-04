package main

//by kevin at 2014-04-15 01：30
//写我喜欢玩的猜数字游戏，初学ｇｏ之第一个程序
//2014-05-15 12:58 转眼一个月就过去了，忙东忙西，都没有透彻之。

import (
    . "fmt"
    "time"
    "math/rand"
    /*"os"*/
)


type Result struct{
    right int
    miss int
}

func rndnum(ci chan []int ){
    rand.Seed(time.Now().UnixNano())
    //使用string, 但是却因为其不可被修改，只好使用[]
    num_set := []int {0,1,2,3,4,5,6,7,8,9}
    sz := len(num_set)
    /*Println("sz:",sz)*/
    for i,_  := range num_set {
        r := rand.Intn(sz)
        /*Println("i:",i," v:",v," r:",r) */
        num_set[i], num_set[r] = num_set[r], num_set[i]
    }

    /*Println("num_set:", num_set) */
    /*return num_set[0:4]*/
    ci <- num_set[0:4]
}

func checknum(n int, target []int, cresult chan Result) {
    //将数字拆分成4个int[]
    num := []int {n/1000, (n%1000)/100, (n%100)/10, (n%10)}
    /*Println("num:", num) */
    /*Println("target:", target) */
    right := 0 //数字对且位置对
    miss := 0 //数字对但是位置不对
    for i,m := range num {
        for j,t :=  range target{
            if m == t {
                if i == j {
                    right++
                } else{
                    miss++
                }
            }
        } 
    }

    cresult <-Result{right:right, miss:miss}
}

func waitforinput(count int , c chan int){
    Printf("%d Please input a number(0000-9999):", count)
    var s int
    Scanf("%d\n", &s)
    c <- s 
}

func main() {
    //产生符合规则的数字
    /*rand.Seed(time.Now().UnixNano())*/
    /*num := rndnum()*/
    /*Println("num:", num) */
    ci := make(chan []int)
    go rndnum(ci)

    num :=  <-ci
    Println("num:", num)
    //开始准备猜数字
    var guess_count int  = 1


    for {
        cinput := make(chan int)
        go waitforinput(guess_count, cinput)
        input := <-cinput
        Println("you input is:", input)

        cresult := make(chan Result)
        go checknum(input, num, cresult)

        result := <-cresult
        /*Println("right:",right," miss:", miss)*/
        Println("\t",input,"\t->\t", result.right,"A", result.miss, "B")
        guess_count++

        if result.right == 4 {
            break
        }
    }

    Println("Yes!!Number is ", num)




}

