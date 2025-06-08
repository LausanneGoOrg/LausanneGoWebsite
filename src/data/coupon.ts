/**
 * Data layer for coupon related operations
 * @author Ugo Balducci
 * @version 1.0.0
 */

import { supabase } from "@/services/database";

/**
 * Class representing a coupon
 */
class Coupon {
  readonly coupon_id: string;
  readonly business_id: string;
  readonly description: string;
  readonly points: number;
  readonly expiration: string;
  readonly qr_code: string;

  static readonly queryKey = () => ["coupons"];
  static readonly queryKeyById = (coupon_id: string) => [
    "coupons",
    { coupon_id },
  ];
  static readonly queryKeyByUser = (userId: string) => ["coupons", { userId }];

  constructor(
    coupon_id: string,
    description: string,
    business_id: string,
    points: number,
    expiration: string,
    qr_code: string
  ) {
    this.coupon_id = coupon_id;
    this.description = description;
    this.business_id = business_id;
    this.points = points;
    this.expiration = expiration;
    this.qr_code = qr_code;
  }

  /**
   * Updates the coupon
   * @param {string} coupon_id - The id of the coupon
   * @param {string} business_id - The business id
   * @param {string} description - The description of the coupon
   * @param {number} points - The points of the coupon
   * @param {string} expiration - The expiration date of the coupon
   * @param {string} qr_code - The qr code of the coupon
   * @returns {Coupon} - The updated coupon
   */
  update({
    coupon_id,
    business_id,
    description,
    points,
    expiration,
    qr_code,
  }: {
    coupon_id?: string;
    business_id?: string;
    description?: string;
    points?: number;
    expiration?: string;
    qr_code?: string;
  }) {
    return new Coupon(
      coupon_id ?? this.coupon_id,
      business_id ?? this.business_id,
      description ?? this.description,
      points ?? this.points,
      expiration ?? this.expiration,
      qr_code ?? this.qr_code
    );
  }

  /**
   * Clone the coupon
   * @returns {Coupon} - The cloned coupon
   */
  clone() {
    return new Coupon(
      this.coupon_id,
      this.business_id,
      this.description,
      this.points,
      this.expiration,
      this.qr_code
    );
  }
}

/**
 * Fetches a coupon from the database
 * @param {string} couponId - The id of the coupon
 * @returns {Promise<Coupon>} - The coupon
 * @throws {Error} - The error that occurred
 */
const fetchCoupon = async (couponId: string) => {
  const { data, error } = await supabase
    .from("Coupon")
    .select(
      `
        coupon_id,
        business_id,
        description,
        points,
        expiration,
        qr_code
  `
    )
    .eq("coupon_id", couponId);

  if (error) throw new Error(error.message);

  const coupon = data[0];
  if (!coupon) throw new Error("Coupon not found");

  return new Coupon(
    coupon.coupon_id,
    coupon.description,
    coupon.business_id,
    coupon.points,
    coupon.expiration,
    coupon.qr_code
  );
};

const fetchUserCoupons = async (userId: string) => {
  const { data, error } = await supabase
    .from("Won_Coupon")
    .select(
      `
        coupon_id,
        user_id,
        coupon:Coupon (
          coupon_id,
          business_id,
          description,
          points,
          expiration,
          qr_code
        )
      `
    )
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  if (!data) return [];

  const coupons = data.map((coupon: any) => {
    return new Coupon(
      coupon.coupon.coupon_id,
      coupon.coupon.description,
      coupon.coupon.business_id,
      coupon.coupon.points,
      coupon.coupon.expiration,
      coupon.coupon.qr_code
    );
  });

  return coupons;
};

export default Coupon;
export { fetchCoupon, fetchUserCoupons };
