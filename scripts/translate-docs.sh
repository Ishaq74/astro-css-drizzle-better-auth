#!/bin/bash

# Script pour traduire automatiquement les pages docs de français vers anglais
# Remplace les textes français communs par leurs équivalents anglais

DOCS_DIR="/workspaces/astro-css-drizzle-better-auth/src/pages/en/docs"

# Fonction pour traduire un fichier
translate_file() {
    local file="$1"
    echo "Translating: $file"
    
    # Utiliser sed pour remplacer les textes français par anglais
    sed -i 's/Installation/Installation/g' "$file"
    sed -i 's/Le composant est disponible dans/The component is available in/g' "$file"
    sed -i 's/Props/Props/g' "$file"
    sed -i 's/Prop/Prop/g' "$file"
    sed -i 's/Type/Type/g' "$file"
    sed -i 's/Défaut/Default/g' "$file"
    sed -i 's/Description/Description/g' "$file"
    sed -i 's/Exemples/Examples/g' "$file"
    sed -i 's/Exemple/Example/g' "$file"
    sed -i 's/Utilisation basique/Basic Usage/g' "$file"
    sed -i 's/Utilisation/Usage/g' "$file"
    sed -i 's/Variants/Variants/g' "$file"
    sed -i 's/Couleurs/Colors/g' "$file"
    sed -i 's/Accessibilité/Accessibility/g' "$file"
    sed -i 's/Meilleures pratiques/Best Practices/g' "$file"
    sed -i 's/Documentation complète/Complete documentation/g' "$file"
    sed -i 's/avec tous les variants et exemples/with all variants and examples/g' "$file"
    sed -i 's/Composants/Components/g' "$file"
    sed -i 's/Composant/Component/g' "$file"
}

# Parcourir tous les fichiers .astro
find "$DOCS_DIR" -name "*.astro" -type f | while read -r file; do
    translate_file "$file"
done

echo "✅ Translation complete!"
