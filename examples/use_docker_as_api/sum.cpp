#include <fstream>
#include <iostream>
#include <string>

using namespace std;

int main(int argc, char** argv)
{
    if(argc < 2)
    {
        cout<<"Usage: "<<argv[0]<<" file" <<endl;
        return -1;
    }

    string file_name = argv[1];

    fstream fs(file_name.c_str());
    if(!fs.is_open()) 
    {
        cout<<"fs open failed"<<endl;
        return -2;
    }

    int sum = 0;
    int line = 0;
    while(fs>>line)
    {
        sum += line;
    }

    cout<<"sum:"<<sum<<endl;
    return 0;
}
