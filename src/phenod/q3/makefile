# Hasq Technology Pty Ltd (C) 2013-2016

MYLIB=q3lib
SQ3=sqlite
SQPATH=../../ext/sqlite/

SRC=../
include $(SRC)mk_all.mak

O=$(TRG)

GLDIR=../gl
INC := $(INC) -I$(GLDIR)
GLLIB=$(GLDIR)/$O/htgllib$(LEXT)

OSDIR=../os
INC := $(INC) -I$(OSDIR)
OSLIB=$(OSDIR)/$O/htoslib$(LEXT)

src = dbo.cpp 
obj := $(src:%.cpp=$O/%$(OEXT))

srctrg =
trg := $(srctrg:%.cpp=$O/%$(EEXT))


all: $O $(trg) $O/$(MYLIB)$(LEXT)

$O:
	mkdir -p $O

$(trg): $O/%$(EEXT):%.cpp $O/$(MYLIB)$(LEXT)
	$(COMPILER) $(OPT) $(INC) $< $O/$(MYLIB)$(LEXT) $(LDF) $(EOUT)$@

$(obj): $O/%$(OEXT):%.cpp *.h sqlite3.h
	$(COMPILER) -c $(OPT) $(INC) $(FLAGS) $< $(OOUT)$@

clean:
	rm -rf _bin*
	rm -rf *.obj *.pdb *.gcno *.gcov *.gcda
	rm -f sqlite3.h

$O/$(MYLIB)$(LEXT): $(obj)
	$(ARCR)$O/$(MYLIB)$(LEXT) $(obj)

#	$(RANLIB) $O/$(MYLIB)$(LEXT) 


sqlite3.h: $O/sqlite/sqlite3.h
	cp $< $@


SQ3F=$(SQ3).fcl
SQ3FZ=$(SQ3F).bz2

$O/sqlite/sqlite3.h: $O/$(SQ3F)
	cd $O && fcl3 extr $(SQ3F)

$O/$(SQ3F): $O/$(SQ3FZ)
	cd $O && bzip2 -d $(SQ3FZ) 
	chmod 0777 $@

$O/$(SQ3FZ): $(SQPATH)/$(SQ3FZ)
	cp $< $@

