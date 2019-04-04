assume cs:code
code segment
	mov ax,0ffffh
	mov ds,ax

	mov dx,0

	mov cx,9
s:	mov bx,cx
	mov al,[bx]
	mov ah,0
	add dx,ax
	loop s

	mov ax,4c00h
	int 21h
code ends
end

