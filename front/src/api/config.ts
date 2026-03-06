export const apiEndpoint = import.meta.env.VITE_API_URL;

export const statusEnumToString = (status: string) => {
  switch (status) {
    case "PENDING":
      return "En attente";
    case "INTERVIEW":
      return "Entretien";
    case "FOLLOW_UP":
      return "À rappeler";
    case "ACCEPTED":
      return "Accepté";
    default:
      return status;
  }
};

export const statusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "orange";
    case "INTERVIEW":
      return "blue";
    case "FOLLOW_UP":
      return "purple";
    case "ACCEPTED":
      return "green";
    default:
      return "gray";
  }
};

export const statusGradientColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "from-orange-400 to-orange-600 dark:from-orange-500/80 dark:to-orange-400/80";
    case "INTERVIEW":
      return "from-blue-400 to-blue-600 dark:from-blue-500/80 dark:to-blue-400/80";
    case "FOLLOW_UP":
      return "from-purple-400 to-purple-600 dark:from-purple-500/80 dark:to-purple-400/80";
    case "ACCEPTED":
      return "from-green-400 to-green-600 dark:from-green-500/80 dark:to-green-400/80";
    default:
      return "from-zinc-400 to-zinc-600 dark:from-zinc-600 dark:to-zinc-500";
  }
};
