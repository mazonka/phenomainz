# (C) 2016

ifeq ($(OS),Windows_NT)
	PLAT=msc
else
	PLAT=unx
endif

BIN=../_bin_$(PLAT)

all: $(BIN) $(BIN)/jraf.php

$(BIN):
	@echo Create folders tree in $(BIN_CLI) ...
	@mkdir -p $(BIN)

$(BIN)/jraf.php: $(BIN)/jraf.php
	@echo Copy $(SRC_CLI) to $(BIN_CLI)...
	cp *.php $(BIN)
