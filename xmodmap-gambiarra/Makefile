load_abnt2_extended: load_abnt2_extended.c
	$(CC) -o load_abnt2_extended load_abnt2_extended.c -lX11

load_abnt2_extended.c: load_xmodmap get_my_keymap_in_c
	@echo Generating load_abnt2_extended.c
	@./get_my_keymap_in_c >load_abnt2_extended.c

load_xmodmap: be_sure_node_modules_installed
	@echo ""
	@echo "******************************************************"
	@echo "* Applying keymap. System will hang, be patient. ;-) *"
	@echo "******************************************************"
	@echo ""
	@( cd .. ; babel-node linux-xmodmap.js ) | xmodmap -

get_my_keymap_in_c: get_my_keymap_in_c.c
	$(CC) -o get_my_keymap_in_c get_my_keymap_in_c.c -lX11

be_sure_node_modules_installed:
	@test -d ../node_modules || ( cd ..; which yarn >/dev/null && yarn install || npm install )

clean:
	-rm get_my_keymap_in_c
	-rm load_abnt2_extended
	-rm load_abnt2_extended.c