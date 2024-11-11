import React from "react";
import styles from "./ProfileView.module.css";

const ProfileView: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Sección de perfil del entrenador */}
      <div className={styles.profileSection}>
        <div className={styles.profilePictureContainer}>
          <img
            src="/images/profesor/profe3.png"
            alt="Profile"
            className={styles.profilePicture}
          />
        </div>
        <h2 className={styles.role}>Gym Coach</h2>
        <div className={styles.rating}>⭐⭐⭐⭐⭐</div>
        <h3 className={`${styles.name} ${styles.oswaldText}`}>
          Jessica Roberts
        </h3>
        <ul className={styles.contactInfo}>
          <li>📞 +54 1146246237</li>
          <li>📧 jessicaroberts@gmail.com</li>
          <li>📸 @jessicacouchgym</li>
        </ul>
      </div>

      {/* Sección de Alumnos y Clases */}
      <div className={styles.studentsSection}>
        <div className={styles.tabs}>
          <span className={`${styles.activeTab} ${styles.oswaldText}`}>
            Alumnos
          </span>
          <span className={styles.tabSeparator}>|</span>
          <span className={styles.oswaldText}>Clases</span>
        </div>
        <div className={styles.studentList}>
          <div className={styles.student}>
            <img
              src="/images/profesor/profe3.png"
              alt="Student 1"
              className={styles.studentPicture}
            />
            <div className={styles.studentInfo}>
              <h4>Jane Cooper</h4>
              <p>📞 (303) 555-0121 📧 janecooper@gmail.com</p>
            </div>
          </div>
          <hr className={styles.separator} />

          <div className={styles.student}>
            <img
              src="/images/profesor/profe2.png"
              alt="Student 2"
              className={styles.studentPicture}
            />
            <div className={styles.studentInfo}>
              <h4>Devon Lane</h4>
              <p>📞 (303) 555-0121 📧 devonlane@gmail.com</p>
            </div>
          </div>
          <hr className={styles.separator} />

          <div className={styles.student}>
            <img
              src="/images/profesor/profe1.png"
              alt="Student 3"
              className={styles.studentPicture}
            />
            <div className={styles.studentInfo}>
              <h4>Chris James</h4>
              <p>📞 (303) 555-0121 📧 chrisjames@gmail.com</p>
            </div>
          </div>
          <hr className={styles.separator} />

          <div className={styles.student}>
            <img
              src="/images/profesor/profe2.png"
              alt="Student 4"
              className={styles.studentPicture}
            />
            <div className={styles.studentInfo}>
              <h4>Anna Smith</h4>
              <p>📞 (303) 555-0121 📧 annasmith@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
