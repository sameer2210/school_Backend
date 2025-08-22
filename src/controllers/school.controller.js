import { pool } from '../db.js';
import { addSchoolSchema, listSchoolsSchema } from '../validators/school.validator.js';

/** POST /addSchool */
export const addSchool = async (req, res) => {
  try {
    const { value, error } = addSchoolSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        details: error.details.map(d => d.message),
      });
    }

    const { name, address, latitude, longitude } = value;

    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );

    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      // @ts-ignore
      data: { id: result.insertId, name, address, latitude, longitude },
    });
  } catch (err) {
    console.error('addSchool error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/** GET /listSchools?latitude=..&longitude=..&limit=100 */
export const listSchools = async (req, res) => {
  try {
    const { value, error } = listSchoolsSchema.validate(req.query, {
      abortEarly: false,
      convert: true,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        details: error.details.map(d => d.message),
      });
    }

    const latitude = Number(value.latitude);
    const longitude = Number(value.longitude);
    const parsedLimit = Number.parseInt(value.limit, 10);

    const sql = `
      SELECT
        id, name, address, latitude, longitude,
        (6371 * ACOS(
          COS(RADIANS(?)) * COS(RADIANS(latitude)) *
          COS(RADIANS(longitude) - RADIANS(?)) +
          SIN(RADIANS(?)) * SIN(RADIANS(latitude))
        )) AS distance
      FROM schools
      ORDER BY distance ASC
      LIMIT ${parsedLimit};
    `;

    const params = [latitude, longitude, latitude];
    const [rows] = await pool.execute(sql, params);

    return res.json({
      success: true,
      message: 'Schools sorted by proximity',
      data: rows,
    });
  } catch (err) {
    console.error('listSchools error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
