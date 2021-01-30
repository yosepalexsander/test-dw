-- menampilkan semua data pada tabel school
SELECT * FROM school_tb;

-- menampilkan data school dengan user yang membuat data tsb
SELECT user_tb.id, user_tb.name AS user_name, school_tb.name_school, school_tb.address, school_tb.logo_school, school_tb.school_level, school_tb.status_school FROM school_tb INNER JOIN user_tb ON user_tb.id = school_tb.user_id LIMIT 1;


-- edit 1 data school
UPDATE school_tb SET NPSN=20606600, name_school='SD NEGERI PENINGGILAN 2', address='Jl Dr Wahidin Sudiro Husodo No. 5', logo_school='https://storage.googleapis.com/s.mysch.id/picture/60718396sampah1.jpg', school_level='SD', status_school='NEGERI' WHERE id=1;

-- menampilkan seluruh data sekolah berdasarkan status (contoh status: SD)
SELECT * FROM school_tb WHERE status_school='SD';