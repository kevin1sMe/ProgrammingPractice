assume cs:code

;dh:行号(0-24)   dl列号(0-79)   cl:颜色  ds:si指向字符串的首地址

data segment
	db 'Welcome to masm!',0
data ends

code segment
start:	mov dh,8
		mov dl,3
		mov cl,2
		mov ax,data
		mov ds,ax
		mov si,0
		call show_str

		mov ax,4c00h
		int 21h

show_str:	
		push ax
		push dx
		push cx

		;计算显示位置的偏移为(dh-1)*0ah + (dl-1)*2
		mov ah,0
		mov al,dh	;用于乘法
		dec al
		mul 0ah  ;结果存放在ax中

		mov dh,0
		add ax,dx
		add ax,dx
		sub ax,2  ;加上了(dl-1)*2

		;在偏移的位置写入 [字符],[颜色]
		mov ax,0B800h
		mov ss,ax
		mov si,0

code ends
end start