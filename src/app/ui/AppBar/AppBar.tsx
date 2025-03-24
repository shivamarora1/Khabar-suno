import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { menuIcon, volumeUpIcon } from "@progress/kendo-svg-icons";

import { Button } from "@progress/kendo-react-buttons";
import { Typography } from "@progress/kendo-react-common";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";

export const AppBarComponent = ({
  menuClickCallback,
  languageChangeCallback,
  toggleAudioDialog,
}: {
  menuClickCallback: () => void;
  languageChangeCallback: (lang: string) => void;
  toggleAudioDialog: () => void;
}) => {
  const handleChange = (event: DropDownListChangeEvent) => {
    languageChangeCallback(event.target.value == "Hindi" ? "hi" : "en");
  };
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

      <AppBarSection className="w-4/10 md:w-7/10 xl:w-8/10">
        <Typography.h5 className="!m-0">Khabar Suno</Typography.h5>
      </AppBarSection>

      <Button svgIcon={volumeUpIcon} onClick={toggleAudioDialog} />
      <DropDownList
        data={["Hindi", "English"]}
        defaultValue="English"
        onChange={handleChange}
      />
    </AppBar>
  );
};
