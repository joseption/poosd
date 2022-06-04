<?php

	$inData = getRequestInfo();

	$userid = $inData["userId"];
	$NewContact = $inData["contact"];

	
	$name = $NewContact["name"];
	$phone = $NewContact["phone"];
	$email = $NewContact["email"];
    $contactid = $NewContact["id"];

	$conn = new mysqli("localhost", "TheBeast4", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET Name=?, Phone=?, Email=? WHERE ID=? AND UserID=?");
		$stmt->bind_param("sssis", $name, $phone, $email, $contactid, $userid);
		$stmt->execute();
		$stmt->close();
		
		$stmt = $conn->prepare("SELECT ID, Name, Phone, Email FROM Contacts WHERE id=? AND UserID=?");
		$stmt->bind_param("is", $contactid, $userid);
		$stmt->execute();
		$result = $stmt->get_result();
		
		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['Name'], $row['Phone'], $row['Email'], $row['ID'] );
		}
		else
		{
			returnWithError("Contact Update Failed"); // Account not updated
		}
		$stmt->close();

		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithInfo( $name, $phone, $email, $id )
	{
		$retValue = '{"id":' . $id . ',"name":"' . $name . '","phone":"' . $phone . '","email":"' . $email . '","error":"Contact Updated"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
