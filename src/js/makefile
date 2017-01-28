# (C) 2016

ifeq ($(OS),Windows_NT)
	PLAT=msc
else
	PLAT=unx
endif

BIN=_bin_$(PLAT)
BIN_CLI=../$(BIN)/phclnt
BIN_JRAF=../$(BIN)/jraf
BIN_CLI_LIB=$(BIN_CLI)/lib
SRC_CLI=clnt
SRC_JRAF=jraf
SRC_CLI_LIB=$(SRC_CLI)/lib

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

all: mk_dir tar_x_jq cp_jq tar_x_hello.js cp_hello.js mk_clnt mk_jraf done

mk_dir:
	@echo Create folders tree in $(BIN_CLI) ...
	@mkdir -p $(BIN_CLI)/css
	@mkdir -p $(BIN_CLI)/img
	@mkdir -p $(BIN_CLI_LIB)
	@mkdir -p $(BIN_CLI_LIB)/images
	@mkdir -p $(BIN_CLI)/jraf
	@mkdir -p $(BIN_JRAF)

tar_x_jq: $(JQ_FULL_NAME)
	@echo Unpack $(JQ_SHRT_NAME) ...
	@cp $< $(SRC_CLI_LIB)/
	@tar xjvf $(SRC_CLI_LIB)/$(JQ_SHRT_NAME) -C $(SRC_CLI_LIB)/ >/dev/null
	@echo Remove $(JQ_SHRT_NAME) ...
	@rm $(SRC_CLI_LIB)/$(JQ_SHRT_NAME)
	@chmod 0777 -R $(shell echo $(SRC_CLI_LIB)/$(JQ_FILE_BASE))
	@echo Rename $(shell echo $(SRC_CLI_LIB)/$(JQ_FILE_BASE)) to $(JQ_QI) ...
	@mv $(shell echo $(SRC_CLI_LIB)/$(JQ_FILE_BASE)) $(SRC_CLI_LIB)/$(JQ_QI)

cp_jq: $(SRC_CLI_LIB)/$(JQ_QI)
	@echo Copy $(JQ_QI) to $(BIN_CLI_LIB) ...
	@cp $</jquery-ui.min.js $(BIN_CLI_LIB)/
	@cp $</jquery-ui.min.css $(BIN_CLI_LIB)/
	@cp $</external/jquery/jquery.js $(BIN_CLI_LIB)/
	@cp $</images/*.png $(BIN_CLI_LIB)/images
	@cp $</external/jquery/jquery.js $(BIN_CLI_LIB)/
	@echo Remove $< ...
	@rm -rf $<

tar_x_hello.js: $(HL_FULL_NAME)
	@echo Unpack $(HL_SHRT_NAME) ...
	@cp $< $(SRC_CLI_LIB)/
	@tar xjvf $(SRC_CLI_LIB)/$(HL_SHRT_NAME) -C $(SRC_CLI_LIB)/ >/dev/null
	@echo Remove $(HL_SHRT_NAME) ...
	@rm $(SRC_CLI_LIB)/$(HL_SHRT_NAME)
	@chmod 0777 -R $(shell echo $(SRC_CLI_LIB)/$(HL_FILE_BASE))
	@echo Rename $(shell echo $(SRC_CLI_LIB)/$(HL_FILE_BASE)) to $(HELLO_JS) ...
	@mv $(shell echo $(SRC_CLI_LIB)/$(HL_FILE_BASE)) $(SRC_CLI_LIB)/$(HELLO_JS)

cp_hello.js: $(SRC_CLI_LIB)/$(HELLO_JS)
	@echo Copy $(HELLO_JS) to $(BIN_CLI_LIB) ...
	@cp $</dist/hello.all.js $(BIN_CLI_LIB)/
	@cp $</assets/redirect.css $(BIN_CLI_LIB)/
	@echo Remove $< ...
	@rm -rf $<

mk_clnt: $(SRC_CLI)/index.html
	@echo Copy $(SRC_CLI) to $(BIN_CLI)...
	cp -puv $(SRC_CLI)/css/*.css $(BIN_CLI)/css/
	cp -puv $(SRC_CLI)/img/*.* $(BIN_CLI)/img/
	cp -puv $(SRC_CLI)/jraf/*.js $(BIN_CLI)/jraf/
	cp -puv $(SRC_CLI)/conf.phd ../$(BIN)/conf.phd
	cp -puv $(SRC_CLI)/favicon.ico $(BIN_CLI)/favicon.ico
	cp -puv $(SRC_CLI)/jraf.phd ../$(BIN)/jraf.phd
	cp -puv $(SRC_CLI)/home.phd ../$(BIN)/home.phd
	cp -puv $(SRC_CLI)/index.html $(BIN_CLI)/index.html
	@chmod 0777 -R $(BIN_CLI) || echo "Cannot make chmod on $(BIN_CLI)"

mk_jraf:
	@echo Copy $(SRC_JRAF) to $(BIN_JRAF)...
	cp -pruv  $(SRC_JRAF)/. $(BIN_JRAF)/
	# @chmod 0777 -R $(BIN_JRAF) || echo "Cannot make chmod on $(BIN_JRAF)"

done:
	@echo Done.

clean:
	rm -rf $< $(SRC_CLI_LIB)/jquery*.*
	rm -rf $(BIN_CLI)
	rm -rf $(BIN_JRAF)
	rm -rf ../$(BIN)/home.phd
	rm -rf ../$(BIN)/jraf.phd
	rm -rf ../$(BIN)/conf.phd
	@echo Done.

checkin: $(BIN_CLI)
	cp -fpuv $(BIN_CLI)/css/*.css $(SRC_CLI)/css/
	cp -fpuv $(BIN_CLI)/img/*.png $(SRC_CLI)/img/
	cp -fpuv $(BIN_CLI)/img/*.gif $(SRC_CLI)/img/
	cp -fpuv $(BIN_CLI)/*.html $(SRC_CLI)/
	cp -fpuv $(BIN_CLI)/jraf/*.js $(SRC_CLI)/jraf/
	cp -pruv $(BIN_JRAF)/sys/. $(SRC_JRAF)/sys
	cp -fpuv ../$(BIN)/home.phd $(SRC_CLI)/
	cp -fpuv ../$(BIN)/conf.phd $(SRC_CLI)/
	cp -fpuv ../$(BIN)/jraf.phd $(SRC_CLI)/
	@chmod 0777 -R $(SRC_CLI)
	@echo All done.
