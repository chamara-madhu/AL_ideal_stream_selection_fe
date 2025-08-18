import React, { useState } from "react";
import {
  ChevronDown,
  BookOpen,
  Award,
  Target,
  Send,
  GraduationCap,
  Brain,
  TrendingUp,
  CheckCircle,
  Trophy,
  Lightbulb,
  Star,
  Briefcase,
  Microscope,
  Calculator,
  Palette,
  BarChart3,
} from "lucide-react";
import axios from "axios";

const ALStreamPrediction = () => {
  const [formData, setFormData] = useState({
    olGrades: {
      Mathematics: "",
      Science: "",
      Sinhala: "",
      English: "",
      Commerce: "",
      ICT: "",
      Buddhism: "",
      History: "",
      Arts: "",
      Drama: "",
      Music: "",
      Dancing: "",
    },
    favoriteOLSubject: "",
    leastFavoriteOLSubject: "",
    participatedSports: "",
    sportsTypes: [],
    participatedClubs: "",
    enjoysCreative: "",
    leadershipRole: "",
    learningStyle: "",
    strengths: [],
    preferredCareer: "",
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleMultipleSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const grades = ["A", "B", "C", "S", "F", "N/A"];
  const streams = [
    "Bio Science",
    "Physical Science / Maths",
    "Commerce",
    "Arts",
    "Technology",
  ];
  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "Sinhala",
    "Commerce",
    "ICT",
    "History",
    "Arts",
    "Drama",
    "Music",
    "Dancing",
  ];
  const sports = [
    "Cricket",
    "Football",
    "Athletics",
    "Basketball",
    "Volleyball",
    "Swimming",
    "Rugby",
    "Chess",
    "Other",
  ];
  const skills = [
    "Analytical thinking",
    "Creativity",
    "Communication",
    "Problem-solving",
    "Leadership",
    "Teamwork",
  ];
  const careers = [
    "Engineering",
    "Medicine",
    "Business",
    "Teaching",
    "Law",
    "IT",
    "Other",
  ];

  const sections = [
    { title: "O/L Performance", icon: BookOpen, color: "purple" },
    { title: "Interests & Activities", icon: Award, color: "purple" },
    { title: "Preferences & Career", icon: Target, color: "purple" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/predict", {
        ol_math: formData.olGrades.Mathematics,
        ol_science: formData.olGrades.Science,
        ol_sinhala: formData.olGrades.Sinhala,
        ol_english: formData.olGrades.English,
        ol_commerce: formData.olGrades.Commerce,
        ol_ict: formData.olGrades.ICT,
        ol_history: formData.olGrades.History,
        ol_arts: formData.olGrades.Arts,
        ol_drama: formData.olGrades.Drama,
        ol_music: formData.olGrades.Music,
        ol_dancing: formData.olGrades.Dancing,
        ol_favorite_subject: formData.favoriteOLSubject,
        ol_least_favorite_subject: formData.leastFavoriteOLSubject,
        sports_participation: formData.participatedSports,
        sports_list: formData.sportsTypes.join(", "),
        club_participation: formData.participatedClubs,
        creative_subject_interest: formData.enjoysCreative,
        leadership_roles: formData.leadershipRole,
        learning_style: formData.learningStyle,
        skills_strengths: formData.strengths.join(", "),
        career_preference: formData.preferredCareer,
      })
      .then((res) => {
        console.log(res.data.ranked_streams);
        setPrediction(res.data);
        setIsSubmitted(true);
        setShowPrediction(true);
      })
      .catch((err) => console.log(err));
  };

  function scrollToTop() {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      scrollToTop()
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      scrollToTop()
    }
  };

  const getStreamIcon = (stream) => {
    switch (stream) {
      case "Physical Science / Maths":
        return Calculator;
      case "Bio Science":
        return Microscope;
      case "Commerce":
        return Briefcase;
      case "Arts":
        return Palette;
      default:
        return Calculator;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 0: // 1st place
        return "bg-purple-800";
      case 1: // 2nd place
        return "bg-purple-600";
      case 2: // 3rd place
        return "bg-purple-400";
      case 3: // 4th place
        return "bg-purple-200";
      default:
        return "bg-gray-600";
    }
  };

  const getRankBorder = (rank) => {
    switch (rank) {
      case 0: // 1st place
        return "border-purple-800";
      case 1: // 2nd place
        return "border-purple-600";
      case 2: // 3rd place
        return "border-purple-400";
      case 3: // 4th place
        return "border-purple-200";
      default:
        return "border-gray-200";
    }
  };

  const getRankTextColor = (rank) => {
    switch (rank) {
      case 0: // 1st place
        return "text-purple-800";
      case 1: // 2nd place
        return "text-purple-600";
      case 2: // 3rd place
        return "text-purple-400";
      case 3: // 4th place
        return "text-purple-300";
      default:
        return "text-gray-600";
    }
  };

  const renderPredictionResults = () => {
    if (!prediction) return null;
    scrollToTop()

    const sortedStreams = Object.entries(prediction.ranked_streams)
      .sort(([, a], [, b]) => b - a)
      .filter(([, percentage]) => percentage > 0);

    return (
      <div className="min-h-screen">
        <div className="max-w-5xl mx-auto">
          {/* Professional Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl shadow-sm mb-6">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Your Ideal A/L Stream Prediction Results
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Based on your assessment, here are your recommended academic
              streams ranked by compatibility
            </p>
          </div>

          {/* Results Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header Bar */}
            <div className="bg-purple-600 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Stream Compatibility Analysis
                  </h2>
                </div>
                <div className="text-purple-100 text-sm font-medium">
                  Assessment Complete
                </div>
              </div>
            </div>

            {/* Stream Results */}
            <div className="p-8">
              <div className="space-y-6">
                {sortedStreams.map(([stream, percentage], index) => {
                  const Icon = getStreamIcon(stream);
                  const isTop = index === 0;
                  const colorClass = getRankColor(index);
                  const borderClass = getRankBorder(index);
                  const textColor = getRankTextColor(index);

                  return (
                    <div
                      key={stream}
                      className={`group relative border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-md ${
                        isTop
                          ? "border-purple-800 bg-purple-50/50"
                          : `${borderClass} bg-white hover:bg-gray-50/50`
                      }`}
                    >
                      {/* Rank Indicator */}
                      <div className="absolute top-4 right-4">
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                            isTop
                              ? "bg-purple-800 text-white"
                              : `${colorClass} text-white`
                          }`}
                        >
                          {isTop && <Star className="h-3 w-3" />}
                          Rank #{index + 1}
                        </div>
                      </div>

                      <div className="pr-24">
                        <div className="flex items-start gap-6">
                          {/* Icon Container */}
                          <div
                            className={`flex-shrink-0 w-14 h-14 ${colorClass} rounded-xl flex items-center justify-center shadow-sm`}
                          >
                            <Icon className={`h-7 w-7 text-white`} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {stream}
                            </h3>
                            <div className="flex items-center gap-6 mb-4">
                              <div className="flex items-center gap-2 text-gray-600">
                                <TrendingUp className="h-4 w-4" />
                                <span className="font-medium">
                                  Compatibility Score
                                </span>
                              </div>
                              <div
                                className={`text-2xl font-bold ${textColor}`}
                              >
                                {percentage.toFixed(1)}%
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full">
                              <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <span>Match Level</span>
                                <span>
                                  {percentage >= 80
                                    ? "Excellent"
                                    : percentage >= 70
                                    ? "Very Good"
                                    : percentage >= 60
                                    ? "Good"
                                    : percentage >= 40
                                    ? "Fair"
                                    : percentage >= 20
                                    ? "Poor"
                                    : "Very Poor"}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                  className={`h-full transition-all duration-1000 ease-out ${colorClass}`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p>
                    Need different results? You can retake the assessment at any
                    time.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setShowPrediction(false);
                    setCurrentSection(0);
                    setPrediction(null);
                    scrollToTop()
                  }}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Results are based on your responses and academic performance
              indicators. Consider consulting with academic advisors for
              personalized guidance.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-blue-800 font-medium mb-1">
                    Please fill in only the relevant subjects and mark the
                    others as N/A.
                  </p>
                  <p className="text-sm text-blue-600">
                    පහත සඳහන් විෂයයන් සඳහා ඔබේ සා/පෙළ සාමාර්ථ මොනවාද? අදාළ
                    විෂයයන් පමණක් පුරවා අනෙක් ඒවා N/A ලෙස ලකුණු කරන්න.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="text-left p-4 font-semibold text-gray-700 border-b">
                        Subject
                      </th>
                      {grades.map((grade) => (
                        <th
                          key={grade}
                          className="text-center p-4 font-semibold text-gray-700 border-b w-20"
                        >
                          {grade}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, index) => (
                      <tr
                        key={subject}
                        className={`hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-25"
                        }`}
                      >
                        <td className="p-4 font-medium border-b border-gray-100">
                          {subject}
                        </td>
                        {grades.map((grade) => (
                          <td
                            key={grade}
                            className="text-center p-4 border-b border-gray-100"
                          >
                            <input
                              type="radio"
                              name={`ol_${subject}`}
                              value={grade}
                              checked={formData.olGrades[subject] === grade}
                              onChange={(e) =>
                                handleInputChange(
                                  `olGrades.${subject}`,
                                  e.target.value
                                )
                              }
                              className={`w-4 h-4 text-purple-600 focus:ring-purple-500`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="grid gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What was your favorite subject in O/L? *
                  <br />
                  <span className="text-sm text-gray-500 font-normal">
                    සා/පෙළ ඔබ කැමතිම විෂය වූයේ කුමක්ද ?
                  </span>
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white shadow-sm"
                    value={formData.favoriteOLSubject}
                    onChange={(e) =>
                      handleInputChange("favoriteOLSubject", e.target.value)
                    }
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What was your least favorite subject in O/L? *
                  <br />
                  <span className="text-sm text-gray-500 font-normal">
                    සා/පෙළ ඔබ අකමැතිම විෂය වූයේ කුමක්ද?
                  </span>
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white shadow-sm"
                    value={formData.leastFavoriteOLSubject}
                    onChange={(e) =>
                      handleInputChange(
                        "leastFavoriteOLSubject",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Did you participate in sports during your school years? *
              </label>
              <div className="flex gap-6 mb-6">
                {["Yes", "No"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="participatedSports"
                      value={option}
                      checked={formData.participatedSports === option}
                      onChange={(e) =>
                        handleInputChange("participatedSports", e.target.value)
                      }
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500 mr-3"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              {formData.participatedSports === "Yes" && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Which sports did you participate in?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {sports.map((sport) => (
                      <label
                        key={sport}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={sport}
                          checked={formData.sportsTypes.includes(sport)}
                          onChange={() =>
                            handleMultipleSelect("sportsTypes", sport)
                          }
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500 mr-3"
                        />
                        <span className="text-gray-700">{sport}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Did you participate in any clubs or societies? *
              </label>
              <div className="flex gap-6">
                {["Yes", "No"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="participatedClubs"
                      value={option}
                      checked={formData.participatedClubs === option}
                      onChange={(e) =>
                        handleInputChange("participatedClubs", e.target.value)
                      }
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500 mr-3"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="grid gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Do you enjoy creative subjects? *
                </label>
                <div className="flex gap-6">
                  {["Yes", "No"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="enjoysCreative"
                        value={option}
                        checked={formData.enjoysCreative === option}
                        onChange={(e) =>
                          handleInputChange("enjoysCreative", e.target.value)
                        }
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500 mr-3"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Did you hold any leadership roles in school? *
                </label>
                <div className="flex gap-6">
                  {["Yes", "No"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="leadershipRole"
                        value={option}
                        checked={formData.leadershipRole === option}
                        onChange={(e) =>
                          handleInputChange("leadershipRole", e.target.value)
                        }
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500 mr-3"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                What is your preferred learning style? *
              </label>
              <div className="flex gap-6">
                {["More theory", "More practical / Calculations"].map(
                  (style) => (
                    <label
                      key={style}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="learningStyle"
                        value={style}
                        checked={formData.learningStyle === style}
                        onChange={(e) =>
                          handleInputChange("learningStyle", e.target.value)
                        }
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500 mr-3"
                      />
                      <span className="text-gray-700">{style}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Which skills do you consider your strengths? *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={skill}
                      checked={formData.strengths.includes(skill)}
                      onChange={() => handleMultipleSelect("strengths", skill)}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500 mr-3"
                    />
                    <span className="text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                What is your most preferred career field? *
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white shadow-sm"
                  value={formData.preferredCareer}
                  onChange={(e) =>
                    handleInputChange("preferredCareer", e.target.value)
                  }
                >
                  <option value="">Select Career Field</option>
                  {careers.map((career) => (
                    <option key={career} value={career}>
                      {career}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showPrediction) {
    return (
      <div className="min-h-screen bg-purple-50">
        <div className="container mx-auto px-4 py-8">
          {renderPredictionResults()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="min-h-screen">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-full shadow-lg">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Find Your Ideal A/L Stream
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                ML-Powered Stream Prediction for Sri Lankan Students
              </p>
              <p className="text-sm text-gray-500 max-w-4xl mx-auto leading-relaxed mb-2">
                Discover the perfect A/L subject stream based on your academic
                performance, interests, and career goals. Our intelligent system
                analyzes your profile to recommend the most suitable educational
                path for your future success.
              </p>
              <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>Personalized Recommendations</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Brain className="h-4 w-4 text-purple-500" />
                  <span>ML-Powered Analysis</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8 max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Progress
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  {currentSection + 1} of {sections.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                  style={{
                    width: `${((currentSection + 1) / sections.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Section Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm ${
                      index === currentSection
                        ? `bg-${section.color}-600 text-white shadow-lg scale-105`
                        : index < currentSection
                        ? "bg-green-100 text-green-800"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="hidden sm:inline">{section.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Main Form */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {sections[currentSection].title}
                  </h2>
                  <div
                    className={`h-1 w-20 bg-${sections[currentSection].color}-600 rounded-full`}
                  ></div>
                </div>

                <form>
                  {renderSection()}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={prevSection}
                      disabled={currentSection === 0}
                      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                        currentSection === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm hover:shadow-md"
                      }`}
                    >
                      Previous
                    </button>

                    {currentSection === sections.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                        className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                          isSubmitted
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 cursor-pointer"
                        }`}
                      >
                        <Send className="h-5 w-5" />
                        {isSubmitted ? "Processing..." : "Get My Prediction"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={nextSection}
                        className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl bg-purple-600 text-white hover:bg-purple-700 transform hover:scale-105 cursor-pointer"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALStreamPrediction;
