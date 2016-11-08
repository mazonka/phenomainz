# (C) 2016

ifeq ($(OS),Windows_NT)
	PLAT=msc
else
	PLAT=unx
endif

BIN_DIR=_bin_$(PLAT)
CLNT=../$(BIN_DIR)/phclnt
CLNT_LIB=$(CLNT)/lib
SRC=src
SRC_LIB=$(SRC)/lib
JQ_QI=jquery-ui
JQ_EXT_DIR=../ext/jq
JQ_FILE_BASE=jquery-ui-*.custom
JQ_FILE_SUFF=tar.bz2
JQ_FULL_NAME=$(wildcard $(JQ_EXT_DIR)/$(JQ_FILE_BASE).$(JQ_FILE_SUFF))
JQ_SHRT_NAME=$(shell basename $(JQ_FULL_NAME))

all: mk_dir tar_x_jq cp_jq mk_phclnt done

mk_dir:
	@echo Create folders tree in $(CLNT) ...
	@mkdir -p $(CLNT)/css
	@mkdir -p $(CLNT)/eng
	@mkdir -p $(CLNT)/front
	@mkdir -p $(CLNT)/img
	@mkdir -p $(CLNT)/lib
	@mkdir -p $(CLNT)/lib/images
	@mkdir -p $(CLNT)/ui

tar_x_jq: $(JQ_FULL_NAME)
	@echo Unpack $(JQ_SHRT_NAME) ...
	@cp $< $(SRC_LIB)/
	@tar xjvf $(SRC_LIB)/$(JQ_SHRT_NAME) -C $(SRC_LIB)/ >/dev/null
	@echo Remove $(JQ_SHRT_NAME) ...
	@rm $(SRC_LIB)/$(JQ_SHRT_NAME)
	@chmod 0777 -R $(shell echo $(SRC_LIB)/$(JQ_FILE_BASE))
	@echo Rename $(shell echo $(SRC_LIB)/$(JQ_FILE_BASE)) to $(JQ_QI) ...
	@mv $(shell echo $(SRC_LIB)/$(JQ_FILE_BASE)) $(SRC_LIB)/$(JQ_QI)

cp_jq: $(SRC_LIB)/$(JQ_QI)
	@echo Copy $(JQ_QI) to $(CLNT_LIB) ...
	@cp $</jquery-ui.min.js $(CLNT_LIB)/
	@cp $</jquery-ui.min.css $(CLNT_LIB)/
	@cp $</external/jquery/jquery.js $(CLNT_LIB)/
	@cp $</images/*.png $(CLNT_LIB)/images
	@cp $</external/jquery/jquery.js $(CLNT_LIB)/
	@echo Remove $< ...
	@rm -rf $<

mk_phclnt: $(SRC)/index.html
	@echo Copy $(SRC) to $(CLNT)...
	@cp $(SRC)/css/pheno.css $(CLNT)/css/
	@cp $(SRC)/eng/*.js $(CLNT)/eng/
	@cp $(SRC)/front/*.js $(CLNT)/front/
	@cp $(SRC)/ui/*.js $(CLNT)/ui/
	@cp $(SRC)/phclnt.html $(CLNT)/phclnt.html
	@cp $(SRC)/index.html $(CLNT)/index.html
	@cp $(SRC)/img/*.* $(CLNT)/img/
	@chmod 0777 -R $(CLNT) || echo "Cannot make chmod on $(CLNT)"

done:
	@echo Done.

clean: $(CLNT)
	@echo Remove $< and $(SRC_LIB)/jquery*.*.
	@rm -rf $< $(SRC_LIB)/jquery*.*
	@echo Remove ../$(BIN_DIR)/hq.*.lock if exists.
	@rm -rf ../$(BIN_DIR)/hq.*.lock
	@echo Done.

checkin: $(CLNT)
	@cp -f $(CLNT)/front/*.js $(SRC)/front/
	@echo $(CLNT)/front/ to $(SRC)/front/ - copied.
	@cp -f $(CLNT)/eng/*.js $(SRC)/eng/
	@echo $(CLNT)/eng/ to $(SRC)/eng/ - copied.
	@cp -f $(CLNT)/ui/*.js $(SRC)/ui/
	@echo $(CLNT)/ui/ to $(SRC)/ui/ - copied.
	@cp -f $(CLNT)/*.html $(SRC)/
	@echo $(CLNT)/ to $(SRC)/ - copied.
	@cp -f $(CLNT)/css/*.css $(SRC)/css/
	@echo $(CLNT)/css/ to $(SRC)/css/ - copied.
	@chmod 0777 -R $(SRC)
	@echo All done.
