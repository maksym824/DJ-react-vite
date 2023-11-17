import React, { createContext, useState } from "react";

interface CreateAccountContextData {
  displayName: string;
  firstName: string;
  lastName: string;
  profileURL: string;
  shortBio: string;
  location: string;
  country: string;
  countryCode: string;
  instagram: string;
  soundcloud: string;
  website: string;
  profileImage: File | null;
  coverImage: File | null;
  profilePreview: string;
  coverPreview: string;
  setDisplayName: (displayName: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setProfileURL: (profileURL: string) => void;
  setShortBio: (shortBio: string) => void;
  setLocation: (location: string) => void;
  setCountry: (country: string) => void;
  setCountryCode: (countryCode: string) => void;
  setInstagram: (instagram: string) => void;
  setSoundcloud: (soundcloud: string) => void;
  setWebsite: (website: string) => void;
  setProfileImage: (profileImage: File | null) => void;
  setCoverImage: (coverImage: File | null) => void;
  setProfilePreview: (profilePreview: string) => void;
  setCoverPreview: (coverPreview: string) => void;
}

const CreateAccountContext = createContext<CreateAccountContextData>(
  {} as CreateAccountContextData
);

export const CreateAccountContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileURL, setProfileURL] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [instagram, setInstagram] = useState("");
  const [soundcloud, setSoundcloud] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  return (
    <CreateAccountContext.Provider
      value={{
        displayName,
        firstName,
        lastName,
        profileURL,
        shortBio,
        location,
        country,
        countryCode,
        instagram,
        soundcloud,
        website,
        profileImage,
        coverImage,
        profilePreview,
        coverPreview,
        setDisplayName,
        setFirstName,
        setLastName,
        setProfileURL,
        setShortBio,
        setLocation,
        setCountry,
        setCountryCode,
        setInstagram,
        setSoundcloud,
        setWebsite,
        setProfileImage,
        setCoverImage,
        setProfilePreview,
        setCoverPreview,
      }}
    >
      {children}
    </CreateAccountContext.Provider>
  );
};

export default CreateAccountContext;
