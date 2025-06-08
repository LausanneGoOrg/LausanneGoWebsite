export type Storage = {
  settings: {
    confidentiality: {
      accessPosition: boolean;
      personalizedVisits: boolean;
    };
    notification: {
      pushNotifications: boolean;
      challengeNotifications: boolean;
      eventNotifications: boolean;
      promotionsNotifications: boolean;
    };
  };
  connection: {
    skipped: boolean;
    firstConnection: boolean;
  };
};
