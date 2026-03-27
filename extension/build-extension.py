#!/usr/bin/env python3
"""
Build script for Chrome Extension packaging
Creates a ZIP file ready for submission to Chrome Web Store
"""

import os
import shutil
import zipfile
from pathlib import Path

def create_extension_zip(output_filename='makeideploy-extension.zip'):
    """Create a zip file of the extension for Chrome Web Store submission"""
    
    extension_dir = Path(__file__).parent
    project_root = extension_dir.parent
    
    # Files and folders to include
    include_files = [
        'manifest.json',
        'popup.html',
        'popup.js',
        'service-worker.js',
        'icons/icon-16.png',
        'icons/icon-48.png',
        'icons/icon-128.png',
    ]
    
    output_path = project_root / output_filename
    
    print(f"📦 Creating extension package: {output_filename}")
    print(f"📁 Extension folder: {extension_dir}")
    
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file in include_files:
            file_path = extension_dir / file
            if file_path.exists():
                arcname = file  # Store with relative path in ZIP
                zipf.write(file_path, arcname)
                print(f"  ✓ Added: {file}")
            else:
                print(f"  ⚠ WARNING: Missing: {file}")
    
    # Check ZIP file size
    size_mb = output_path.stat().st_size / (1024 * 1024)
    print()
    print(f"✨ Package created successfully!")
    print(f"📊 File size: {size_mb:.2f} MB")
    print(f"📍 Location: {output_path}")
    print()
    print("Next steps:")
    print("1. Go to https://chromewebstore.google.com/webstore/devconsole")
    print("2. Select your item or create new item")
    print("3. Upload this ZIP file")
    print("4. Fill in description, screenshots, and categories")
    print("5. Submit for review!")

if __name__ == '__main__':
    try:
        create_extension_zip()
    except FileNotFoundError as e:
        print(f"❌ Error: {e}")
        print()
        print("Required files missing! Have you run the icon generator?")
        print("Run: npm run generate:icons")
    except Exception as e:
        print(f"❌ Error: {e}")
