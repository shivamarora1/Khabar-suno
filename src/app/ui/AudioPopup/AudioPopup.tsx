import { Dialog } from "@progress/kendo-react-dialogs";
import { useState, useEffect } from "react";
import { Typography } from "@progress/kendo-react-common";
import { Loader } from "@progress/kendo-react-indicators";

export const AudioPopupComponent = ({
  toggleDialog,
  language,
}: {
  toggleDialog: () => void;
  language: string;
}) => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAudio = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/${language}/audio`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Error fetching audio:", response.statusText);
          return;
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioSrc(url);
        console.log(url);
      } catch (error) {
        console.error("Error converting text to audio:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAudio();
  }, [language]);

  return (
    <Dialog title={loading ? "Please Wait" : "Listen"} onClose={toggleDialog}>
      {loading && <Loader themeColor="info" size="large" type="pulsing" />}
      {audioSrc && (
        <div className="flex justify-center flex-col items-center">
          <Typography.h5>Today latest news</Typography.h5>
          <audio controls>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </Dialog>
  );
};
