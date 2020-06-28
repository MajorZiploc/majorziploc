export JUST_PROJECT_ROOT="`pwd`";

function just_format {
  cd "$JUST_PROJECT_ROOT";
  changed_files=(`{ git --no-pager status | egrep "[[:blank:]]+(modified|new file):[[:blank:]]+[^[:blank:]]+" | gsed -E "s/.*?(modified|new file):[[:blank:]]+([^[:blank:]]+)/\2/g"; git --no-pager status | egrep "[[:blank:]]+(renamed):[[:blank:]]+[^[:blank:]]+" | gsed -E "s/.*?(renamed):[[:blank:]]+[^[:blank:]]+ -> ([^[:blank:]])/\2/g"; } | egrep "\.(jsx?|tsx?|json|html)$"`);
  prettier --write "${changed_files[@]}";
  cd ~-;
}

function just_format_all {
  cd "$JUST_PROJECT_ROOT";
  all_files=(`find -E . -type f -iregex ".*\.(jsx?|json|tsx?|html)$" -not -path "*/node_modules/*"`);
  prettier --write "${all_files[@]}";
  cd ~-;
}

function just_install {
  cd "$JUST_PROJECT_ROOT";
  npm install -g prettier;
  cd ~-;
}

function just_build {
  cd "$JUST_PROJECT_ROOT";
  npm install;
  cd ~-;
}

function just_generate_pdf {
  local tex_file="${1:?}";
  pdflatex "$tex_file";
}

function just_update_resume {
  cd "$JUST_PROJECT_ROOT";
  node ./src/generateLatexResume.js;
  cd ~-;
  cd "$JUST_PROJECT_ROOT/resume";
  just_generate_pdf ./manyu_lakhotia_resume.tex;
  cp ./manyu_lakhotia_resume.pdf ../../public/manyu_lakhotia_resume.pdf;
  cd ~-;
}

function just_update_cover_letter {
  cd "$JUST_PROJECT_ROOT";
  node ./src/generateLatexCoverLetterVariables.js;
  cd ~-;
  cd "$JUST_PROJECT_ROOT/cover_letter";
  just_generate_pdf ./manyu_lakhotia_cover_letter.tex;
  cd ~-;
}
