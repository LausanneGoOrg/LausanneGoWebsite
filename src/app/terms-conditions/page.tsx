import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Terms() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#ff2d2d] mb-4">
                CONDITIONS D'UTILISATION
              </h1>
              <p className="text-gray-600">
                Dernière mise à jour : 26 mars 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                ACCORD AVEC NOS CONDITIONS LÉGALES
              </h2>

              <p className="text-gray-700 mb-4">
                Nous sommes <strong>LausanneGo Association</strong> («{" "}
                <strong>Société</strong> », « <strong>nous</strong> », «{" "}
                <strong>notre</strong> »), une société enregistrée en Suisse au
                Chemin des Triaudes 4B/322, Ecublens, Vaud 1024.
              </p>

              <p className="text-gray-700 mb-4">
                Nous exploitons l'application mobile <strong>LausanneGo</strong>{" "}
                (l'« <strong>App</strong> »), ainsi que tous les autres produits
                et services connexes qui font référence ou renvoient à ces
                conditions légales (les « <strong>Conditions légales</strong> »)
                (collectivement, les « <strong>Services</strong> »).
              </p>

              <p className="text-gray-700 mb-6">
                Nous fournissons une expérience qui permet aux gens de découvrir
                la ville et de mettre en avant les commerces locaux de manière
                ludique.
              </p>

              <p className="text-gray-700 mb-6">
                Vous pouvez nous contacter par email à{" "}
                <a
                  href="mailto:contact@lausannego.ch"
                  className="text-blue-600 hover:underline"
                >
                  contact@lausannego.ch
                </a>
                ou par courrier au Chemin des Triaudes 4B/322, Ecublens, Vaud
                1024, Suisse.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-gray-700">
                  <strong>Important :</strong> Ces Conditions légales
                  constituent un accord juridiquement contraignant entre vous et
                  LausanneGo Association concernant votre accès et votre
                  utilisation des Services. En accédant aux Services, vous
                  acceptez d'être lié par toutes ces Conditions légales.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                TABLE DES MATIÈRES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                <a href="#services" className="text-blue-600 hover:underline">
                  1. NOS SERVICES
                </a>
                <a
                  href="#intellectual"
                  className="text-blue-600 hover:underline"
                >
                  2. DROITS DE PROPRIÉTÉ INTELLECTUELLE
                </a>
                <a
                  href="#user-representations"
                  className="text-blue-600 hover:underline"
                >
                  3. DÉCLARATIONS DE L'UTILISATEUR
                </a>
                <a
                  href="#registration"
                  className="text-blue-600 hover:underline"
                >
                  4. INSCRIPTION DE L'UTILISATEUR
                </a>
                <a href="#prohibited" className="text-blue-600 hover:underline">
                  5. ACTIVITÉS INTERDITES
                </a>
                <a
                  href="#contributions"
                  className="text-blue-600 hover:underline"
                >
                  6. CONTRIBUTIONS GÉNÉRÉES PAR L'UTILISATEUR
                </a>
                <a href="#license" className="text-blue-600 hover:underline">
                  7. LICENCE DE CONTRIBUTION
                </a>
                <a href="#mobile" className="text-blue-600 hover:underline">
                  8. LICENCE D'APPLICATION MOBILE
                </a>
                <a
                  href="#third-party"
                  className="text-blue-600 hover:underline"
                >
                  9. SITES WEB ET CONTENU TIERS
                </a>
                <a
                  href="#advertisers"
                  className="text-blue-600 hover:underline"
                >
                  10. ANNONCEURS
                </a>
                <a href="#management" className="text-blue-600 hover:underline">
                  11. GESTION DES SERVICES
                </a>
                <a href="#privacy" className="text-blue-600 hover:underline">
                  12. POLITIQUE DE CONFIDENTIALITÉ
                </a>
              </div>

              <section id="services" className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  1. NOS SERVICES
                </h3>
                <p className="text-gray-700 mb-4">
                  Les informations fournies lors de l'utilisation des Services
                  ne sont pas destinées à être distribuées ou utilisées par
                  toute personne ou entité dans toute juridiction ou pays où une
                  telle distribution ou utilisation serait contraire à la loi ou
                  à la réglementation.
                </p>
              </section>

              <section id="intellectual" className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  2. DROITS DE PROPRIÉTÉ INTELLECTUELLE
                </h3>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Notre propriété intellectuelle
                </h4>
                <p className="text-gray-700 mb-4">
                  Nous sommes propriétaires ou licenciés de tous les droits de
                  propriété intellectuelle de nos Services, y compris tout le
                  code source, les bases de données, les fonctionnalités, les
                  logiciels, les conceptions de sites web, l'audio, la vidéo, le
                  texte, les photographies et les graphiques dans les Services
                  (collectivement, le « Contenu »).
                </p>

                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Votre utilisation de nos Services
                </h4>
                <p className="text-gray-700 mb-4">
                  Sous réserve de votre conformité à ces Conditions légales,
                  nous vous accordons une licence non exclusive, non
                  transférable et révocable pour :
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>accéder aux Services ; et</li>
                  <li>
                    télécharger ou imprimer une copie de toute partie du Contenu
                    auquel vous avez légalement accès
                  </li>
                </ul>
                <p className="text-gray-700 mb-4">
                  uniquement pour votre usage personnel et non commercial.
                </p>
              </section>

              <section id="user-representations" className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  3. DÉCLARATIONS DE L'UTILISATEUR
                </h3>
                <p className="text-gray-700 mb-4">
                  En utilisant les Services, vous déclarez et garantissez que :
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>
                    Toutes les informations d'inscription que vous soumettez
                    seront vraies, exactes, actuelles et complètes
                  </li>
                  <li>Vous maintiendrez l'exactitude de ces informations</li>
                  <li>
                    Vous avez la capacité légale et acceptez de vous conformer à
                    ces Conditions légales
                  </li>
                  <li>
                    Vous n'êtes pas mineur dans la juridiction où vous résidez,
                    ou si vous êtes mineur, vous avez reçu l'autorisation
                    parentale
                  </li>
                  <li>
                    Vous n'accéderez pas aux Services par des moyens automatisés
                    ou non humains
                  </li>
                </ul>
              </section>

              <section id="prohibited" className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  5. ACTIVITÉS INTERDITES
                </h3>
                <p className="text-gray-700 mb-4">
                  Vous ne pouvez pas accéder ou utiliser les Services à d'autres
                  fins que celles pour lesquelles nous rendons les Services
                  disponibles. Les Services ne peuvent pas être utilisés en lien
                  avec des entreprises commerciales sauf celles qui sont
                  spécifiquement approuvées ou autorisées par nous.
                </p>
              </section>

              <section id="contact" className="mb-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  CONTACTEZ-NOUS
                </h3>
                <p className="text-gray-700 mb-2">
                  Pour résoudre une plainte concernant les Services ou pour
                  recevoir de plus amples informations concernant l'utilisation
                  des Services, veuillez nous contacter à :
                </p>
                <div className="text-gray-700">
                  <p>
                    <strong>LausanneGo Association</strong>
                  </p>
                  <p>Chemin des Triaudes 4B/322</p>
                  <p>Ecublens, Vaud 1024</p>
                  <p>Suisse</p>
                  <p>
                    Email :{" "}
                    <a
                      href="mailto:contact@lausannego.ch"
                      className="text-blue-600 hover:underline"
                    >
                      contact@lausannego.ch
                    </a>
                  </p>
                </div>
              </section>

              <div className="text-center mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Ces conditions d'utilisation ont été mises à jour pour la
                  dernière fois le 26 mars 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
