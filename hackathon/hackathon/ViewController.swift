//
//  ViewController.swift
//  hackathon
//
//  Created by Mohan Dhar on 6/5/15.
//  Copyright (c) 2015 Mohan Dhar. All rights reserved.
//

import UIKit
import MobileCoreServices

class ViewController: UIViewController, UINavigationControllerDelegate, UIImagePickerControllerDelegate {
    
    var beenHereBefore = false
    var controller:UIImagePickerController?
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        println("Camera is ")
        
        if isCameraAvailable() == false {
            print("not ")
        }
        println("available")
    
        
        if doesCameraSupportTakingPhotos() {
            println("The camera supports taking photos")
        } else {
            println("The camera does NOT support taking photos")
        }
        
        if doesCameraSupportShootingVideos() {
            println("The camera supports shooting videos")
        } else {
            println("The camera does not support shooting videos");
        }
    }
    
    func isCameraAvailable() -> Bool {
        return UIImagePickerController.isSourceTypeAvailable(.Camera)
    }
    
    func cameraSupportsMedia(mediaType: String, sourceType: UIImagePickerControllerSourceType) -> Bool {
        let availableMediaTypes = UIImagePickerController.availableMediaTypesForSourceType(sourceType) as! [String]
        for type in availableMediaTypes {
            if type == mediaType {
                return true
            }
        }
        return false
    }
    
    func doesCameraSupportShootingVideos() -> Bool {
        return cameraSupportsMedia(kUTTypeMovie as String, sourceType: .Camera)
    }
    
    func doesCameraSupportTakingPhotos() -> Bool {
        return cameraSupportsMedia(kUTTypeImage as String, sourceType: .Camera)
    }
    
    
    // Opens the Camera
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
        
        if beenHereBefore {
            return;
        } else {
            beenHereBefore = true;
        }
        
        if isCameraAvailable() && doesCameraSupportTakingPhotos() {
            controller = UIImagePickerController()
            
            
            if let theController = controller {
                theController.sourceType = .Camera
                theController.mediaTypes = [kUTTypeImage as NSString]
                theController.allowsEditing = true
                theController.delegate = self
                //theController.showsCameraControls = false;
                //theController.navigationBarHidden = true;
                //theController.toolbarHidden = true;

                //CUSTOM OVERLAY
                
                presentViewController(theController, animated: true, completion: nil)
            }
        } else {
            println("Camera is not available")
        }
    }
    @IBAction func iHaveButtonPressed(sender: UIButton) {
        println("I Have button pressed");
    }
    
    // Having the ability to Take photos
    func imagePickerController(picker: UIImagePickerController, didFinishPickingImage image: UIImage!, editingInfo: [NSObject : AnyObject]!) {
        println("Picker returned successfully")
        
        let mediaType:AnyObject? = editingInfo[UIImagePickerControllerMediaType]
        if let type:AnyObject = mediaType {
            if type is String {
                let stringType = type as! String
                
                if stringType == kUTTypeMovie as NSString {
                    let urlOfVideo = editingInfo[UIImagePickerControllerMediaURL] as? NSURL
                    if let url = urlOfVideo {
                        println("Video URL = \(url)")
                    }
                }
                else if stringType == kUTTypeImage as NSString {
                    /* Get the metadata, only for images -- not videos */
                    let metadata = editingInfo[UIImagePickerControllerMediaMetadata] as? NSDictionary
                    
                    if let theMetaData = metadata {
                        let image = editingInfo[UIImagePickerControllerOriginalImage] as? UIImage
                        
                        if let theImage = image {
                            println("Image Metadata = \(theMetaData)")
                            println("Image = \(theImage)")
                        }
                        
                    }
                }
            }
        }
        picker.dismissViewControllerAnimated(true, completion: nil)
    }
    

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

