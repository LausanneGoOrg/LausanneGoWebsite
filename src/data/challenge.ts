import { supabase } from "@/services/database";

class Challenge {
  readonly challenge_id: string;
  readonly name: string;
  readonly description: string;
  readonly points: number;
  readonly picture: string;
  readonly start_date: string;
  readonly end_date: string;
  readonly title: string;
  readonly business_id: string;

  static readonly queryKey = () => ["challenges"];
  static readonly queryKeyById = (challenge_id: string) => [
    "challenges",
    { challenge_id },
  ];

  constructor(
    challenge_id: string,
    name: string,
    description: string,
    points: number,
    picture: string,
    start_date: string,
    end_date: string,
    title: string,
    business_id: string
  ) {
    this.challenge_id = challenge_id;
    this.name = name;
    this.description = description;
    this.points = points;
    this.picture = picture;
    this.start_date = start_date;
    this.end_date = end_date;
    this.title = title;
    this.business_id = business_id;
  }

  update({
    challenge_id,
    name,
    description,
    points,
    picture,
    start_date,
    end_date,
    title,
    business_id,
  }: {
    challenge_id?: string;
    name?: string;
    description?: string;
    points?: number;
    picture?: string;
    start_date?: string;
    end_date?: string;
    title?: string;
    business_id?: string;
  }) {
    return new Challenge(
      challenge_id ?? this.challenge_id,
      name ?? this.name,
      description ?? this.description,
      points ?? this.points,
      picture ?? this.picture,
      start_date ?? this.start_date,
      end_date ?? this.end_date,
      title ?? this.title,
      business_id ?? this.business_id
    );
  }
}

const fromJson = (json: any) => {
  return new Challenge(
    json.challenge_id,
    json.name,
    json.description,
    json.points,
    json.picture,
    json.start_date,
    json.end_date,
    json.title,
    json.business_id
  );
};

const fetchChallenge = async (challenge_id: string) => {
  const { data, error } = await supabase
    .from("Challenge")
    .select("*")
    .eq("challenge_id", challenge_id);
  if (error) throw new Error(error.message);
  return fromJson(data[0]);
};

const fetchChallenges = async () => {
  const { data, error } = await supabase.from("Challenge").select("*");
  if (error) throw new Error(error.message);
  return data.map(fromJson);
};

export default Challenge;

export { fetchChallenge, fromJson, fetchChallenges };
