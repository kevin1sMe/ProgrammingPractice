cmake_minimum_required (VERSION 2.6)

project(cpp)

set(CMAKE_CXX_COMPILER  g++)
set(CMAKE_CXX_FLAGS     -std=c++11 -Werror -Wall)

set(CMAKE_VERBOSE_MAKEFILE  off)
set(CMAKE_COLOR_MAKEFILE    on)

file(GLOB CPP_SOURCE *.cpp)

FOREACH(file ${CPP_SOURCE})
    #message("find cpp file:" ${file})
    get_filename_component(short_file ${file} NAME)
    string(REPLACE ".cpp" "" file_target ${short_file})

    add_custom_target(${file_target}
        ALL
        COMMAND  ${CMAKE_CXX_COMPILER} ${CMAKE_CXX_FLAGS} ${file} -o ${file_target}
        DEPENDS ${file}
        COMMENT "================find cpp file:${short_file}===================="
)
ENDFOREACH()

