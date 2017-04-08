# Workaround for xmodmap event thrashing

When xmodmap runs, it calls `XChangeKeyboardMapping` once for each key it modifies,
which generates `MappingNotify` events. In some configurations (mine included), this
burst of events causes the system to hang for some time.

This workaround loads our xmodmap keymap, and then generates a program that will
apply all modifications by calling `XChangeKeyboardMapping` only once, thereby
triggering `MappingNotify` only once.
