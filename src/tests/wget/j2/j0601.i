command=jraf au 0 md /aaa/bbb : get 0 / : au 0 save /aaa/bbb 10 MTIzNDU2Nzg5MA== : get 0 / : au 0 save /aaa/c1 10 MTIzNDU2Nzg5MA== : get 0 / : au 0 put /aaa/c2 0 10 MTIzNDU2Nzg5MA== : get 0 / : au 0 put /aaa/c2 10 10 MTIzNDU2Nzg5MA== : get 0 / : read 0 /aaa : get 0 / : au 0 rm /aaa/c1 : get 0 / : au 0 mv /aaa/c2 /aaa/c3 : get 0 / : read 0 /aaa : get 0 /