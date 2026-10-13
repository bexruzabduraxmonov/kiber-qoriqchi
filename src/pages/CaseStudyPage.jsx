import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const CaseStudyPage = ({ onSelectRoom }) => {
  const { t } = useLanguage();

  return (
    <section className="py-12 px-5 sm:px-8 mx-auto max-w-5xl min-h-[75vh] animate-fadeIn">
      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#0ea5e9] font-heading">
          {t('case_title')}
        </h1>
        <p className="text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
          {t('case_desc')}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l border-[#2d3d4f] ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-12">
        {/* Step 1 */}
        <div className="relative">
          <div className="absolute -left-10 sm:-left-14 top-1 w-5 h-5 rounded-full bg-[#1a232c] border-2 border-[#ef4444] flex items-center justify-center shadow-[0_0_10px_#ef4444]"></div>
          <h3 className="text-xl font-bold mb-2 text-white">
            {t('case_s1_t')}
          </h3>
          <p className="text-[#94a3b8] mb-3 leading-relaxed">
            {t('case_s1_d')}
          </p>
          <div className="bg-[#24303c] border border-[#2d3d4f] rounded p-3 font-mono text-xs text-[#f59e0b] overflow-x-auto">
            SELECT * FROM products WHERE name = '' OR 1=1 --'
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative">
          <div className="absolute -left-10 sm:-left-14 top-1 w-5 h-5 rounded-full bg-[#1a232c] border-2 border-[#f59e0b] flex items-center justify-center shadow-[0_0_10px_#f59e0b]"></div>
          <h3 className="text-xl font-bold mb-2 text-white">
            {t('case_s2_t')}
          </h3>
          <p className="text-[#94a3b8] mb-3 leading-relaxed">
            {t('case_s2_d')}
          </p>
        </div>

        {/* Step 3 */}
        <div className="relative">
          <div className="absolute -left-10 sm:-left-14 top-1 w-5 h-5 rounded-full bg-[#1a232c] border-2 border-[#0ea5e9] flex items-center justify-center shadow-[0_0_10px_#0ea5e9]"></div>
          <h3 className="text-xl font-bold mb-2 text-white">
            {t('case_s3_t')}
          </h3>
          <p className="text-[#94a3b8] mb-3 leading-relaxed">
            {t('case_s3_d')}
          </p>
          <div className="bg-[#24303c] border border-[#2d3d4f] rounded p-3 font-mono text-xs text-[#88cc14] overflow-x-auto leading-relaxed">
            {'// Xavfsiz yechim: Prepared Statements'}<br />
            {'$stmt = $pdo->prepare(\'SELECT * FROM products WHERE name = :name\');'}<br />
            {'$stmt->execute([\'name\' => $searchQuery]);'}
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mt-16 text-center max-w-2xl mx-auto">
        <h4 className="text-xl font-bold mb-4 text-white font-heading">
          {t('case_lesson_t')}
        </h4>
        <p className="text-[#94a3b8] mb-6 leading-relaxed">
          {t('case_lesson_d')}
        </p>
        <button
          type="button"
          onClick={() => onSelectRoom('owasp')}
          className="btn-primary bg-[#88cc14] text-black font-bold py-3 px-6 shadow-lg shadow-[#88cc14]/20"
        >
          {t('case_btn')}
        </button>
      </div>
    </section>
  );
};
