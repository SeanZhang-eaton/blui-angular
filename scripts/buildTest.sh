#!/bin/bash
# Validates the build artifacts produced by `pnpm build`.
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

COMPONENTS_DIR="dist/libs/@bldc/angular-components"
THEMES_DIR="dist/libs/@bldc/angular-themes"

check_file() {
    echo -ne "  $1: "
    if [ ! -f "$1" ]; then echo -e "${RED}Not Found${NC}" && exit 1; else echo -e "${GREEN}Found${NC}"; fi
}

if [ ! -d "$COMPONENTS_DIR" ] || [ ! -d "$THEMES_DIR" ]; then
    echo -e "${RED}Build output not found. Run 'pnpm build' first.${NC}"
    exit 1
fi

echo "Checking @bldc/angular-components"
check_file "$COMPONENTS_DIR/package.json"
check_file "$COMPONENTS_DIR/README.md"
check_file "$COMPONENTS_DIR/LICENSE"
check_file "$COMPONENTS_DIR/fesm2022/bldc-angular-components.mjs"
check_file "$COMPONENTS_DIR/types/bldc-angular-components.d.ts"

for component in AppBarComponent ChannelValueComponent DrawerComponent EmptyStateComponent HeroComponent \
    InfoListItemComponent ListItemTagComponent MobileStepperComponent ScoreCardComponent SpacerComponent \
    ThreeLinerComponent ToolbarMenuComponent UserMenuComponent; do
    echo -ne "  export $component: "
    if grep -q "$component" "$COMPONENTS_DIR/types/bldc-angular-components.d.ts"; then
        echo -e "${GREEN}Found${NC}"
    else
        echo -e "${RED}Not Found${NC}" && exit 1
    fi
done

echo "Checking @bldc/angular-themes"
check_file "$THEMES_DIR/package.json"
check_file "$THEMES_DIR/LICENSE"
check_file "$THEMES_DIR/theme.scss"
check_file "$THEMES_DIR/theme-m2.scss"
check_file "$THEMES_DIR/_index.scss"

echo -e "${GREEN}All build artifacts validated successfully!${NC}"