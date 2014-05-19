assume cs:code

data segment
	db '1975','1976','1977','1978' ;年份
	dd 16,22,382,1356				;收入
	dw 3,7,9,13                     ;雇员数
data ends

table segment
	db 4 dup ('year summ ne ?? ')
table ends

code segment
start:	mov ax,data
	mov ds,ax
	mov bx,0

	mov ax,table
	mov ss,ax

	;年份  ds[bx+idata+si]  ds[bx+0h+si]  bx=0  si=(0,4,8,12)  
	;收入  ds[bx+idata+si]  ds[bx+0h+si] bx=10h  si=(0,4,8,12)  
	;雇员人数 ds[bx+idata+si]  ds[bx+0h+si]  bx=20h si=(0,2,4,6)

	;存储table
	;ss[bp+idata]
	;年份 ss[bp+0h+di]  di=(0,2)  bp=(0,10h,20h,30h)
	;收入 ss[bp+5h+di]  di=(0,2)  bp=(0,10h,20h,30h)
	;雇员数 ss[bp+0ah+di] di=0 	bp=(0,10h,20h,30h)
	;人均收入 ss[bp+0d+di] di=0 bp=(0,10h,20h,30h)

	mov bp,0
	mov cx,4
	
	mov si,0

s:  mov di,0
	mov ax,[0+si]
	mov [bp].0h[di],ax	;年份19
	mov ax,[0+si+2]
	mov [bp].0h[di+2],ax	;年份7x

	
	mov di,0
	mov ax,[10h+si]	;收入low8
	mov [bp].5h[di],ax
	mov ax,[10h+si+2]	;收入high8
	mov [bp].5h[di+2],ax

	;mov ax,[20h+si]	;雇员数;比较麻烦是因为其偏移量和上面不同， 这个为word, 偏移量为2字节
	shr si,1
	mov ax,[20h+si] ; 雇员 
	mov [bp].0ah[di],ax

	;计算人均收入
	mov ax,[bp].5h
	mov dx,[bp].5h[di+2]
	div word ptr [bp].0ah
	mov word ptr[bp].0dh,ax

	shl si,1 ;恢复si

	add si,4h
	add bp,10h
	loop s

	mov ax,4c00h
	int 21h

code ends
end start
