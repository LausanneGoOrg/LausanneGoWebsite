/**
 * Data layer for profile related operations
 * @author Ugo Balducci
 * @version 1.0.0
 */

import { supabase } from "@/services/database";

/**
 * Class representing a Profile
 */
class Profile {
  readonly user_id: string;
  readonly username: string;
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly level: number;
  readonly phone: number;
  readonly points: number;
  readonly is_admin: boolean = false;

  static readonly queryKey = (userId: string) => ["profile", { userId }];

  constructor(
    user_id: string,
    username: string,
    e_mail: string,
    first_name: string,
    last_name: string,
    level: number,
    phone: number,
    points: number,
    admin: boolean = false
  ) {
    this.email = e_mail;
    this.first_name = first_name;
    this.last_name = last_name;
    this.level = level;
    this.phone = phone;
    this.points = points;
    this.user_id = user_id;
    this.username = username;
    this.is_admin = admin;
  }

  /**
   * Updates the profile
   * @param {string} user_id - The user id of the profile
   * @param {string} username - The username of the profile
   * @param {string} e_mail - The e-mail of the profile
   * @param {string} first_name - The first name of the profile
   * @param {string} last_name - The last name of the profile
   * @param {number} level - The level of the profile
   * @param {number} phone - The phone of the profile
   * @param {number} points - The points of the profile
   * @param {boolean} admin - Whether the user is an admin
   * @returns {Profile} - The updated profile
   */
  update({
    user_id,
    username,
    e_mail,
    first_name,
    last_name,
    level,
    phone,
    points,
    admin = false,
  }: {
    user_id?: string;
    username?: string;
    e_mail?: string;
    first_name?: string;
    last_name?: string;
    level?: number;
    phone?: number;
    points?: number;
    admin?: boolean;
  }) {
    return new Profile(
      user_id ?? this.user_id,
      username ?? this.username,
      e_mail ?? this.email,
      first_name ?? this.first_name,
      last_name ?? this.last_name,
      level ?? this.level,
      phone ?? this.phone,
      points ?? this.points,
      admin ?? this.is_admin
    );
  }

  /**
   * Clone the profile
   * @returns {Profile} - The cloned profile
   */
  clone() {
    return new Profile(
      this.user_id,
      this.username,
      this.email,
      this.first_name,
      this.last_name,
      this.level,
      this.phone,
      this.points,
      this.is_admin
    );
  }
}

/**
 * Fetches a profile from the database
 * @param {string} userId - The id of the user
 * @returns {Promise<Profile>} - The profile
 */
const fetchProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("User")
    .select(
      `
        email,
        first_name,
        last_name,
        level,
        phone,
        points,
        user_id,
        username,
        is_admin
      `
    )
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  if (data.length === 0) throw new Error("Profile not found");
  const user = data[0];

  return new Profile(
    user.user_id,
    user.username,
    user.email,
    user.first_name,
    user.last_name,
    user.level,
    user.phone,
    user.points,
    user.is_admin || false
  );
};

const fetchRanking = async (page = 0) => {
  const { data, error } = await supabase
    .from("User")
    .select(
      `
        email,
        first_name,
        last_name,
        level,
        phone,
        points,
        user_id,
        username
      `
    )
    .order("points", { ascending: false })
    .range(page * 10, (page + 1) * 10 - 1);

  if (error) throw new Error(error.message);

  if (data.length === 0) throw new Error("Ranking not found");

  const ranking = data.map((user) => {
    return new Profile(
      user.user_id,
      user.username,
      user.email,
      user.first_name,
      user.last_name,
      user.level,
      user.phone,
      user.points
    );
  });

  return ranking;
};

const fetchCashAmount = async (userId: string) => {
  const { data, error } = await supabase
    .from("User")
    .select(
      `
        points,
        used_points
      `
    )
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  if (data.length === 0) throw new Error("Cash amount not found");
  const cashAmount = data[0].points - data[0].used_points;
  return cashAmount as number;
};

const updateProfile = async (newProfile: Profile) => {
  const { data, error } = await supabase
    .from("User")
    .update({
      username: newProfile.username,
      email: newProfile.email,
      first_name: newProfile.first_name,
      last_name: newProfile.last_name,
      phone: newProfile.phone,
    })
    .eq("user_id", newProfile.user_id)
    .select();
  if (error) throw new Error(error.message);
  if (data.length === 0) throw new Error("Profile not found");
  const user = data[0];
  return new Profile(
    user.user_id,
    user.username,
    user.email,
    user.first_name,
    user.last_name,
    user.level,
    user.phone,
    user.points,
    user.is_admin || false
  );
};

const deleteProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("User")
    .delete()
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  const { data: data2, error: error2 } = await supabase.auth.admin.deleteUser(
    "715ed5db-f090-4b8c-a067-640ecee36aa0"
  );
  if (error2) throw new Error(error2.message);
};

const logOut = async () => {
  await supabase.auth.signOut();
};

export default Profile;
export {
  fetchProfile,
  fetchRanking,
  fetchCashAmount,
  updateProfile,
  deleteProfile,
  logOut,
};
