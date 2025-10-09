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
      return "from-orange-400 to-orange-700";
    case "INTERVIEW":
      return "from-blue-400 to-blue-700";
    case "FOLLOW_UP":
      return "from-purple-400 to-purple-700";
    case "ACCEPTED":
      return "from-green-400 to-green-700";
    default:
      return "from-gray-400 to-gray-700";
  }
};
