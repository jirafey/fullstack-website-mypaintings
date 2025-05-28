package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseArtystaDzieloDelete
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseArtystaDzieloDelete   {
  @JsonProperty("message")
  private String message = null;

  @JsonProperty("deleted_image_id")
  private Integer deletedImageId = null;

  public ResponseArtystaDzieloDelete message(String message) {
    this.message = message;
    return this;
  }

  /**
   * Get message
   * @return message
   **/
  @Schema(example = "Dzieło zostało pomyślnie usunięte.", description = "")
  
    public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public ResponseArtystaDzieloDelete deletedImageId(Integer deletedImageId) {
    this.deletedImageId = deletedImageId;
    return this;
  }

  /**
   * Get deletedImageId
   * @return deletedImageId
   **/
  @Schema(example = "123", description = "")
  
    public Integer getDeletedImageId() {
    return deletedImageId;
  }

  public void setDeletedImageId(Integer deletedImageId) {
    this.deletedImageId = deletedImageId;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseArtystaDzieloDelete responseArtystaDzieloDelete = (ResponseArtystaDzieloDelete) o;
    return Objects.equals(this.message, responseArtystaDzieloDelete.message) &&
        Objects.equals(this.deletedImageId, responseArtystaDzieloDelete.deletedImageId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(message, deletedImageId);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseArtystaDzieloDelete {\n");
    
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb.append("    deletedImageId: ").append(toIndentedString(deletedImageId)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
