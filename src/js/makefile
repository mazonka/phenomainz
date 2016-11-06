# (C) 2016

ifeq ($(OS),Windows_NT)
	PLAT=msc
else
	PLAT=unx
endif

BIN_DIR=_bin_$(PLAT)
CLNT_DIR=../$(BIN_DIR)/phclnt
SRC_DIR=src
JQ_EXT_DIR=../ext/jq
JQ_FILE_BASE=jquery-ui-*.custom
JQ_FILE_SUFF=tar.bz2
JQ_FULL_NAME=$(wildcard $(JQ_EXT_DIR)/$(JQ_FILE_BASE).$(JQ_FILE_SUFF))
JQ_SHRT_NAME=$(shell basename $(JQ_FULL_NAME))

all: mk_dir tar_x_jq cp_jq #mk_phclnt

mk_dir:
	@echo Creating folders tree in $(CLNT_DIR) ...
	@mkdir -p $(CLNT_DIR)/css
	@mkdir -p $(CLNT_DIR)/eng
	@mkdir -p $(CLNT_DIR)/front
	@mkdir -p $(CLNT_DIR)/img
	@mkdir -p $(CLNT_DIR)/lib
	@mkdir -p $(CLNT_DIR)/lib/images
	@mkdir -p $(CLNT_DIR)/ui
	@echo -JQ_FILE_BASE: $(JQ_FILE_BASE)
	@echo -JQ_FULL_NAME: $(JQ_FULL_NAME)
	@echo -JQ_SHRT_NAME: $(JQ_SHRT_NAME)

tar_x_jq: $(JQ_FULL_NAME)
	@echo Unpack $(JQ_SHRT_NAME) to $(SRC_DIR)/lib/ ...
	@cp $< $(SRC_DIR)/lib/
	tar xjvf $(SRC_DIR)/lib/$(JQ_SHRT_NAME) -C $(SRC_DIR)/lib/
	rm $(SRC_DIR)/lib/$(JQ_SHRT_NAME)
	
cp_jq: $(SRC_DIR)/lib
	chmod 0777 -R $(shell echo $</$(JQ_FILE_BASE))
	mv $(shell echo $</$(JQ_FILE_BASE)) $(SRC_DIR)/lib/jquery-ui
	
mk_phclnt: $(SRC_DIR)/index.html 
#	phclnt
	@echo Copying files to $(CLNT_DIR)...
	@cp $(SRC_DIR)/css/pheno.css $(CLNT_DIR)/css/
	@cp $(SRC_DIR)/eng/*.js $(CLNT_DIR)/eng/
	@cp $(SRC_DIR)/front/*.js $(CLNT_DIR)/front/
	@cp $(SRC_DIR)/ui/*.js $(CLNT_DIR)/ui/
	@cp $(SRC_DIR)/phclnt.html $(CLNT_DIR)/phclnt.html
	@cp $(SRC_DIR)/index.html $(CLNT_DIR)/index.html
	@cp $(SRC_DIR)/img/*.* $(CLNT_DIR)/img/
#	cp $(SRC_DIR)/lib/jquery-ui/jquery-ui.min.js $(CLNT_DIR)/lib/
#	cp $(SRC_DIR)/lib/jquery-ui/jquery-ui.min.css $(CLNT_DIR)/lib/
#	cp $(SRC_DIR)/lib/jquery-ui/external/jquery/jquery.js $(CLNT_DIR)/lib/
#	cp $(SRC_DIR)/lib/jquery-ui/images/*.png $(CLNT_DIR)/lib/images
#	cp $(SRC_DIR)/lib/jquery-ui/external/jquery/jquery.js $(CLNT_DIR)/lib/
#	chmod
	@chmod 0777 -R $(CLNT_DIR) || echo "Cannot make chmod on $(CLNT_DIR)"

clean:
	@rm -rf lib/jquery* $(CLNT_DIR) index slice lib/*.tar lib/*.tar.bz2
	@rm -rf front/*.gen
	@rm -rf front/*.tmp
	@rm -rf front/hq_help.js
	@rm -rf front/ts_help.js
	@rm -rf hq.*.lock	
	
checkin:
	@cp -f $(CLNT_DIR)/front/*.js $(SRC_DIR)/front/
	@cp -f $(CLNT_DIR)/eng/*.js $(SRC_DIR)/eng/
	@cp -f $(CLNT_DIR)/ui/*.js $(SRC_DIR)/ui/
	@cp -f $(CLNT_DIR)/*.html $(SRC_DIR)/
	@cp -f $(CLNT_DIR)/css/*.css $(SRC_DIR)/css/
#	
	@chmod 0777 -R $(CLNT_DIR)
