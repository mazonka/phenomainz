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

srctrg = sqlcl.cpp
trg := $(srctrg:%.cpp=$O/%$(EEXT))

csrc = sqlite3.c
cobj := $(csrc:%.c=$O/%$(OEXT))

all: $O $(trg) $O/$(MYLIB)$(LEXT)

$O:
	mkdir -p $O

$(trg): $O/%$(EEXT):%.cpp $O/$(MYLIB)$(LEXT) $(OSLIB) $(GLLIB)
	$(COMPILER) $(OPT) $(INC) $< $O/$(MYLIB)$(LEXT) \
	$(OSLIB) $(GLLIB) $(LDF) $(EOUT)$@

$(obj): $O/%$(OEXT):%.cpp *.h sqlite3.h
	$(COMPILER) -c $(OPT) $(INC) $(FLAGS) $< $(OOUT)$@

$(cobj): $O/%$(OEXT):%.c 
	$(COMPILERC) -c $(OPTC) $(INC) $(FLAGS) $< $(OOUT)$@

clean:
	rm -rf _bin*
	rm -rf *.obj *.pdb *.gcno *.gcov *.gcda
	rm -f sqlite3.h sqlite3.c

$O/$(MYLIB)$(LEXT): $(obj) $(cobj)
	$(ARCR)$O/$(MYLIB)$(LEXT) $(obj) $(cobj)

#	$(RANLIB) $O/$(MYLIB)$(LEXT) 


sqlite3.h: $O/sqlite/sqlite3.h
	cp $< $@

sqlite3.c: $O/sqlite/sqlite3.c
	cp $< $@

SQ3F=$(SQ3).fcl
SQ3FZ=$(SQ3F).bz2

$O/sqlite/sqlite3.h: $O/$(SQ3F)
	cd $O && fcl3 extr $(SQ3F)

$O/$(SQ3F): $O/$(SQ3FZ)
	cd $O && bzip2 -d -k $(SQ3FZ) 
	chmod 0777 $@
	touch $@

$O/$(SQ3FZ): $(SQPATH)/$(SQ3FZ)
	cp $< $@

