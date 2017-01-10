# (C) 2016

ifeq ($(OS),Windows_NT)
	PLAT=msc
else
	PLAT=unx
endif

BIN_DIR=_bin_$(PLAT)
CLNT=../$(BIN_DIR)/phclnt
JRAF=../$(BIN_DIR)/jraf
CLNT_LIB=$(CLNT)/lib
SRC=src
SRC_LIB=$(SRC)/lib

JQ_QI=jquery-ui
JQ_EXT_DIR=../ext/jq
JQ_FILE_BASE=jquery-ui-*.custom
JQ_FILE_SUFF=tar.bz2
JQ_FULL_NAME=$(wildcard $(JQ_EXT_DIR)/$(JQ_FILE_BASE).$(JQ_FILE_SUFF))
JQ_SHRT_NAME=$(shell basename $(JQ_FULL_NAME))

HELLO_JS=hello.js
HL_EXT_DIR=../ext/hello.js
HL_FILE_BASE=hello.js-master
HL_FILE_SUFF=tar.bz2
HL_FULL_NAME=$(wildcard $(HL_EXT_DIR)/$(HL_FILE_BASE).$(HL_FILE_SUFF))
HL_SHRT_NAME=$(shell basename $(HL_FULL_NAME))

all: mk_dir tar_x_jq cp_jq tar_x_hello.js cp_hello.js mk_phclnt done

mk_dir:
	@echo Create folders tree in $(CLNT) ...
	@mkdir -p $(CLNT)/css
	@mkdir -p $(CLNT)/eng
	@mkdir -p $(CLNT)/front
	@mkdir -p $(CLNT)/img
	@mkdir -p $(CLNT)/lib
	@mkdir -p $(CLNT)/lib/images
	@mkdir -p $(CLNT)/ui
	@mkdir -p $(CLNT)/jraf
	@mkdir -p $(JRAF)

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

tar_x_hello.js: $(HL_FULL_NAME)
	@echo Unpack $(HL_SHRT_NAME) ...
	@cp $< $(SRC_LIB)/
	@tar xjvf $(SRC_LIB)/$(HL_SHRT_NAME) -C $(SRC_LIB)/ >/dev/null
	@echo Remove $(HL_SHRT_NAME) ...
	@rm $(SRC_LIB)/$(HL_SHRT_NAME)
	@chmod 0777 -R $(shell echo $(SRC_LIB)/$(HL_FILE_BASE))
	@echo Rename $(shell echo $(SRC_LIB)/$(HL_FILE_BASE)) to $(HELLO_JS) ...
	@mv $(shell echo $(SRC_LIB)/$(HL_FILE_BASE)) $(SRC_LIB)/$(HELLO_JS)

cp_hello.js: $(SRC_LIB)/$(HELLO_JS)
	@echo Copy $(HELLO_JS) to $(CLNT_LIB) ...
	@cp $</dist/hello.all.js $(CLNT_LIB)/
	@cp $</assets/redirect.css $(CLNT_LIB)/
	@echo Remove $< ...
	@rm -rf $<

mk_phclnt: $(SRC)/index.html
	@echo Copy $(SRC) to $(CLNT)...
	cp -puv $(SRC)/css/pheno.css $(CLNT)/css/
	cp -puv $(SRC)/eng/*.js $(CLNT)/eng/
	cp -puv $(SRC)/front/*.js $(CLNT)/front/
	cp -puv $(SRC)/ui/*.js $(CLNT)/ui/
	cp -puv $(SRC)/jraf/*.js $(CLNT)/jraf/
	cp -puv $(SRC)/favicon.ico $(CLNT)/favicon.ico
	cp -puv $(SRC)/index.html $(CLNT)/index.html
	cp -puv $(SRC)/home.phd ../$(BIN_DIR)/home.phd
	cp -puv $(SRC)/jraf.phd ../$(BIN_DIR)/jraf.phd
	cp -puv $(SRC)/conf.phd ../$(BIN_DIR)/conf.phd
	cp -puv $(SRC)/img/*.* $(CLNT)/img/
	cp -pruv  $(SRC)/jraf/fs/. $(JRAF)/
	@chmod 0777 -R $(CLNT) || echo "Cannot make chmod on $(CLNT)"

done:
	@echo Done.

clean:
	rm -rf $< $(SRC_LIB)/jquery*.*
	rm -rf $(CLNT)
	rm -rf $(JRAF)
	rm -rf ../$(BIN_DIR)/home.phd
	rm -rf ../$(BIN_DIR)/jraf.phd
	rm -rf ../$(BIN_DIR)/conf.phd
	@echo Done.

checkin: $(CLNT)
	cp -fpuv $(CLNT)/css/*.css $(SRC)/css/
	@echo [ $(CLNT)/css/ to $(SRC)/css/ - copied ]
	cp -fpuv $(CLNT)/eng/*.js $(SRC)/eng/
	@echo [ $(CLNT)/eng/ to $(SRC)/eng/ - copied ]
	cp -fpuv $(CLNT)/front/*.js $(SRC)/front/
	@echo [ $(CLNT)/front/ to $(SRC)/front/ - copied ]
	cp -fpuv $(CLNT)/img/*.png $(SRC)/img/
	cp -fpuv $(CLNT)/img/*.gif $(SRC)/img/
	@echo [ $(CLNT)/img/ to $(SRC)/img/ - copied ]
	cp -fpuv $(CLNT)/ui/*.js $(SRC)/ui/
	@echo [ $(CLNT)/ui/ to $(SRC)/ui/ - copied ]
	cp -fpuv $(CLNT)/*.html $(SRC)/
	cp -fpuv $(CLNT)/jraf/*.js $(SRC)/jraf/
	cp -pruv $(JRAF)/. $(SRC)/jraf/fs/
	@echo [ jraf - copied ]
	cp -fpuv ../$(BIN_DIR)/home.phd $(SRC)/
	cp -fpuv ../$(BIN_DIR)/conf.phd $(SRC)/
	cp -fpuv ../$(BIN_DIR)/jraf.phd $(SRC)/
	@echo [ $(CLNT)/ to $(SRC)/ - copied ]
	@chmod 0777 -R $(SRC)
	@echo All done.
