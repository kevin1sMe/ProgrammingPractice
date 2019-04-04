package main

import "fmt"
import "net/http"
import "io"
import "os"
/*import "file"*/
/*import "html"*/

func commHandler(w http.ResponseWriter, r *http.Request){
    fmt.Println("method:", r.Method) //获取请求的方法
    if r.Method == "GET" {
        fmt.Println("not support GET")
        /*crutime := time.Now().Unix()*/
        /*h := md5.New()*/
        /*io.WriteString(h, strconv.FormatInt(crutime, 10))*/
        /*token := fmt.Sprintf("%x", h.Sum(nil))*/

        /*t, _ := template.ParseFiles("upload.gtpl")*/
        /*t.Execute(w, token)*/
    } else {
        r.ParseMultipartForm(32 << 20)
        file, handler, err := r.FormFile("uploadfile")
        if err != nil {
            fmt.Println(err)
            return
        }
        defer file.Close()
        fmt.Fprintf(w, "%v", handler.Header)
        f, err := os.OpenFile("./upload_dir/"+handler.Filename, os.O_WRONLY|os.O_CREATE, 0666)
        if err != nil {
            fmt.Println(err)
            return
        }
        defer f.Close()
        io.Copy(f, file)
    }
}

func main(){
    fmt.Println("upload svr start!")
    http.HandleFunc("/upload", commHandler)
    http.ListenAndServe("0.0.0.0:8080", nil)
}
