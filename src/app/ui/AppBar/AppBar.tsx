import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { menuIcon } from "@progress/kendo-svg-icons";
import { Button } from "@progress/kendo-react-buttons";

export const AppBarComponent = ({
  menuClickCallback,
}: {
  menuClickCallback: () => void;
}) => {
  return (
    <AppBar positionMode="sticky" themeColor="primary">
      <AppBarSection>
        <Button
          type="button"
          onClick={menuClickCallback}
          fillMode="flat"
          svgIcon={menuIcon}
        />
      </AppBarSection>

      <AppBarSpacer style={{ width: 4 }} />

      <AppBarSection>
        <h1 className="title">Khabar Suno</h1>
      </AppBarSection>
    </AppBar>
  );
};
