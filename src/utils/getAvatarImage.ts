

export const getProfileImageUrl = (image: string | null) => {
    if (!image) {
      return null;
    }else if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }else {
      return `https://api.mycopybot.com/${image}`;
    }
  };