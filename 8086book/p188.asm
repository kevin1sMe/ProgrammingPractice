;在屏幕中间分别显示绿色，绿底红色，白底蓝色的字符串'My name is kevin!'

assume cs:code

data segment
	db 'My name is kevin!',0 ;以0结尾，方便遍历这个字符串
	;db 'My',0 ;查找bug时为了减少遍历，把这个字符串长度减少了
	db 00101100b,01110001b,10000010b
data ends

stack segment
	db 10h dup (0)
stack ends

code segment
	start:mov ax,data
	mov ds,ax
	mov bx,0

	;设置栈
	mov ax,stack
	mov ss,ax
	mov sp,10h

	;设置显示的行号
	mov dh,10
	mov di,0

	mov cx,3;有三种颜色需要显示
s0:
	push cx

	mov si,0
s:  mov ch,0
	mov cl,[bx+si]	;当找到0表示字符串结束了
	jcxz ok

	push bx	;因为把bx作为了临时的它用寄存器，先入栈

	;定义一个函数类似的。让字符及属性在ax中.（al:字符  ah:属性）,让dx存放位置(dh存放行号，dl存放列数)
	mov ax,cx
	;mov ah,0CAh	;这里代表颜色
	mov ah,[bx].12h[di]
	push ax	;将参数1入栈

	mov dl,30
	add dx,si;虽然使用dx,其实只想数据加到dl中,应该是如所愿的吧
	push dx	;将参数2入栈


	;计算目标存储位置（偏移为:(行号-1)*A0+（列号-1）*2）

	pop dx
	mov al,dh
	dec al
	mov ah,0A0h
	mul ah
	mov bx,ax	;将结果先存到bx中

	mov al,dl
	mov ah,0
	dec al
	shl al,1

	add bx,ax

	mov ax,0B800h
	mov es,ax
	;pop dx	;这个好像没用
	pop ax	;这个是要复制过去的字
	mov word ptr es:[bx], ax	;将字复制过去
	pop bx

	inc si
	jmp short s

ok:	pop cx
	inc di
	inc dh
	loop s0

    mov ax,04c00h
	int 21h


code ends

end start