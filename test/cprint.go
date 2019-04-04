package main

/*
#include <stdio.h>
#include <stdlib.h>

void myprintstr(char* str)
{
	printf("%s\n", str);
}
*/
import "C" //和上面不能有空行
import "unsafe"

func main() {
	cstr := C.CString("hello , world")
	defer C.free(unsafe.Pointer(cstr))
	C.puts(cstr)
	//C.printf("test")
	C.myprintstr(cstr)
}
