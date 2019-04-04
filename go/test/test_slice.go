package main

import "fmt"

func main() {
	slice := []int{1, 2, 3, 4, 5}
	s1 := slice[1:3]

	fmt.Println("slice:", slice)
	fmt.Println("s1:", s1)

	fmt.Println("==modify s1[0] = 8==")
	s1[0] = 8
	fmt.Println("slice:", slice)
	fmt.Println("s1:", s1)

	fmt.Println("==apend (6)==")
	s1 = append(s1, 6)
	fmt.Println("slice:", slice)
	fmt.Println("s1:", s1)

	fmt.Println("==apend (7, 8, 9)==")
	s1 = append(s1, 7, 8, 9)
	fmt.Println("slice:", slice)
	fmt.Println("s1:", s1)

}
